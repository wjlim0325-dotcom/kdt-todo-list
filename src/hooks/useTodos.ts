'use client';

/**
 * 서버 데이터 관련 훅 모음 (TanStack Query 사용).
 * - useQuery    : 서버에서 데이터 읽기(GET). 결과를 캐시에 기억해 여러 화면이 함께 쓴다.
 * - useMutation : 서버 데이터 바꾸기(POST/PATCH/DELETE).
 * - invalidateQueries : "기억한 데이터가 낡았다" 표시 → 그 데이터를 쓰는 화면이 자동으로 다시 받아온다.
 * 컴포넌트는 서버 주소를 직접 부르지 않고 항상 이 파일의 훅을 통해서만 통신한다.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo, uploadImage } from '@/apis/todo';
import type { TodoListItem, UpdateTodoDto } from '@/types/todo';

/** React Query 캐시 키 */
export const todoKeys = {
  all: ['todos'] as const,
  list: () => [...todoKeys.all, 'list'] as const,
  detail: (id: number) => [...todoKeys.all, 'detail', id] as const,
};

/** 할 일 목록 조회 */
export function useTodosQuery() {
  return useQuery({ queryKey: todoKeys.list(), queryFn: () => getTodos() });
}

/** 할 일 상세 조회 — 메모/이미지가 항상 최신으로 보이도록 매번 새로 받아온다 */
export function useTodoQuery(id: number) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => getTodo(id),
    staleTime: 0,
    enabled: Number.isFinite(id),
  });
}

/** 할 일 생성 */
export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todoKeys.list() }),
  });
}

/**
 * 목록에서 완료 상태 토글.
 * 서버 응답을 기다리지 않고 화면을 먼저 바꾸고(낙관적 업데이트), 실패하면 이전 상태로 되돌린다.
 */
export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isCompleted }: { id: number; isCompleted: boolean }) =>
      updateTodo(id, { isCompleted }),
    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.list() });
      const previous = queryClient.getQueryData<TodoListItem[]>(todoKeys.list());
      queryClient.setQueryData<TodoListItem[]>(todoKeys.list(), (old) =>
        old?.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo)),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(todoKeys.list(), context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todoKeys.all }),
  });
}

/** 할 일 수정 (상세 페이지의 "수정 완료") */
export function useUpdateTodo(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateTodoDto) => updateTodo(id, dto),
    onSuccess: (data) => {
      queryClient.setQueryData(todoKeys.detail(id), data);
      return queryClient.invalidateQueries({ queryKey: todoKeys.list() });
    },
  });
}

/** 할 일 삭제 */
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: todoKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: todoKeys.list() });
    },
  });
}

/** 이미지 업로드 */
export function useUploadImage() {
  return useMutation({ mutationFn: uploadImage });
}

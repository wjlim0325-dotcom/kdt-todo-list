import type { TodoDetail, TodoListItem, UpdateTodoDto } from '@/types/todo';
import { request } from './client';

/**
 * 할 일 목록 조회.
 * API 의 pageSize 기본값이 10이라 그대로 두면 11번째 항목부터 누락되므로 넉넉하게 요청한다.
 */
export const getTodos = (page = 1, pageSize = 1000) =>
  request<TodoListItem[]>(`/items?page=${page}&pageSize=${pageSize}`);

/** 할 일 생성 */
export const createTodo = (name: string) =>
  request<TodoDetail>('/items', { method: 'POST', body: JSON.stringify({ name }) });

/** 할 일 상세 조회 */
export const getTodo = (id: number) => request<TodoDetail>(`/items/${id}`);

/** 할 일 수정 (이름, 메모, 이미지, 완료 여부) */
export const updateTodo = (id: number, dto: UpdateTodoDto) =>
  request<TodoDetail>(`/items/${id}`, { method: 'PATCH', body: JSON.stringify(dto) });

/** 할 일 삭제 */
export const deleteTodo = (id: number) =>
  request<{ message: string }>(`/items/${id}`, { method: 'DELETE' });

/** 이미지 업로드 → 업로드된 이미지 URL 반환 */
export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return request<{ url: string }>('/images/upload', { method: 'POST', body: formData });
};

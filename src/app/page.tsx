// 'use client': 이 파일은 브라우저에서 실행된다는 표시. 클릭·입력·서버 데이터 요청(훅)을 쓰려면 필요하다.
'use client';

import TodoForm from '@/components/list/TodoForm';
import TodoSection from '@/components/list/TodoSection';
import { useTodosQuery } from '@/hooks/useTodos';

/**
 * 할 일 목록 페이지 ("/").
 * 상단 입력 폼 + 진행 중(TO DO) / 완료(DONE) 두 섹션.
 * 데스크탑(≥1200px)에서는 두 섹션이 가로 2열, 그 이하에서는 세로로 쌓인다.
 */
export default function HomePage() {
  // 서버에서 목록을 가져온다. 데이터가 오기 전에는 isLoading 이 true, 실패하면 isError 가 true.
  // `data: todos = []` 는 "data 를 todos 라는 이름으로 꺼내고, 아직 없으면 빈 배열을 쓴다"는 뜻.
  const { data: todos = [], isLoading, isError, refetch } = useTodosQuery();

  const inProgress = todos.filter((todo) => !todo.isCompleted);
  const completed = todos.filter((todo) => todo.isCompleted);

  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-4 pb-12 md:px-6 md:pt-6 lg:px-0">
      <TodoForm />

      {isLoading ? (
        <p className="mt-10 text-center text-slate-400">불러오는 중...</p>
      ) : isError ? (
        <div className="mt-10 flex flex-col items-center gap-2 text-slate-500">
          <p>할 일 목록을 불러오지 못했어요.</p>
          <button type="button" onClick={() => refetch()} className="cursor-pointer underline">
            다시 시도
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-12 md:mt-10 lg:flex-row lg:gap-6">
          <TodoSection type="todo" todos={inProgress} />
          <TodoSection type="done" todos={completed} />
        </div>
      )}
    </main>
  );
}

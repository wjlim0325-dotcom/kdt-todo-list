'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import TodoDetailForm from '@/components/detail/TodoDetailForm';
import { useTodoQuery } from '@/hooks/useTodos';

/**
 * 할 일 상세 페이지 ("/items/{itemId}").
 * 데스크탑에서는 회색 배경 위 1200px 흰 패널, 태블릿/모바일에서는 화면 전체가 흰 배경이다.
 */
export default function TodoDetailPage() {
  // 폴더 이름 [itemId] 자리에 들어온 주소 값을 꺼낸다. 예: /items/123 → itemId = "123" (문자열)
  const { itemId } = useParams<{ itemId: string }>();
  const id = Number(itemId);
  const { data: todo, isLoading, isError } = useTodoQuery(id);

  return (
    <div className="min-h-[calc(100dvh-60px)] bg-white lg:bg-transparent">
      <main className="mx-auto min-h-[calc(100dvh-60px)] max-w-[1200px] bg-white px-4 py-4 md:px-6 md:py-6 lg:px-[102px]">
        {isLoading ? (
          <p className="mt-10 text-center text-slate-400">불러오는 중...</p>
        ) : isError || !todo ? (
          <div className="mt-10 flex flex-col items-center gap-2 text-slate-500">
            <p>할 일을 찾을 수 없어요.</p>
            <Link href="/" className="underline">
              목록으로 돌아가기
            </Link>
          </div>
        ) : (
          // key 로 항목이 바뀌면 폼 로컬 상태를 새로 초기화한다
          <TodoDetailForm key={todo.id} todo={todo} />
        )}
      </main>
    </div>
  );
}

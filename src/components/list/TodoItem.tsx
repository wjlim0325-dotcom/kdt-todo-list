'use client';

import Link from 'next/link';
import CheckBox from '@/components/common/CheckBox';
import { useToggleTodo } from '@/hooks/useTodos';
import type { TodoListItem } from '@/types/todo';

/**
 * 할 일 목록의 한 항목 (Figma "check-list").
 * - 왼쪽 체크 버튼: 완료 ↔ 진행 중 토글
 * - 나머지 영역(이름): 상세 페이지로 이동
 * 버튼을 링크 안에 중첩하지 않도록 체크 버튼과 링크를 형제 요소로 배치한다.
 */
export default function TodoItem({ todo }: { todo: TodoListItem }) {
  const { mutate: toggle } = useToggleTodo();

  return (
    <li
      className={`flex h-[50px] items-center rounded-[27px] border-2 border-slate-900 pl-3 transition-colors ${
        todo.isCompleted ? 'bg-violet-100' : 'bg-white hover:bg-slate-100'
      }`}
    >
      <CheckBox
        checked={todo.isCompleted}
        label={todo.name}
        onToggle={() => toggle({ id: todo.id, isCompleted: !todo.isCompleted })}
      />
      <Link
        href={`/items/${todo.id}`}
        className={`flex h-full min-w-0 flex-1 items-center pr-3 pl-4 text-base text-slate-800 ${
          todo.isCompleted ? 'line-through' : ''
        }`}
      >
        <span className="truncate">{todo.name}</span>
      </Link>
    </li>
  );
}

import Image from 'next/image';
import EmptyState from '@/components/common/EmptyState';
import type { TodoListItem } from '@/types/todo';
import TodoItem from './TodoItem';

/**
 * "TO DO" / "DONE" 섹션.
 * 상단 라벨 이미지 아래에 항목 목록을 그리고, 비어 있으면 EmptyState 를 보여준다.
 */
interface TodoSectionProps {
  type: 'todo' | 'done';
  todos: TodoListItem[];
}

const LABEL = {
  todo: { src: '/images/label-todo.svg', alt: 'TO DO', width: 101 },
  done: { src: '/images/label-done.svg', alt: 'DONE', width: 97 },
};

export default function TodoSection({ type, todos }: TodoSectionProps) {
  const label = LABEL[type];

  return (
    <section className="flex-1" aria-label={label.alt}>
      <h2 className="mb-4">
        <Image src={label.src} alt={label.alt} width={label.width} height={36} />
      </h2>
      {todos.length === 0 ? (
        <EmptyState type={type} />
      ) : (
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';
import type { TodoDetail, UpdateTodoDto } from '@/types/todo';
import CheckListDetail from './CheckListDetail';
import ImageUploader from './ImageUploader';
import MemoEditor from './MemoEditor';

/**
 * 할 일 상세 수정 폼.
 * 이름/상태/메모/이미지 변경은 로컬 상태에만 반영해 두었다가 "수정 완료" 시 한 번에 PATCH 한다.
 * 수정 완료·삭제 후에는 목록 페이지로 이동한다.
 */
export default function TodoDetailForm({ todo }: { todo: TodoDetail }) {
  const router = useRouter();
  const [name, setName] = useState(todo.name);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [memo, setMemo] = useState(todo.memo ?? '');
  const [imageUrl, setImageUrl] = useState(todo.imageUrl ?? '');

  const { mutate: update, isPending: isUpdating } = useUpdateTodo(todo.id);
  const { mutate: remove, isPending: isDeleting } = useDeleteTodo();

  // 변경 사항이 있으면 "수정 완료" 버튼을 활성(lime) 색으로 표시한다
  const isDirty =
    name !== todo.name ||
    isCompleted !== todo.isCompleted ||
    memo !== (todo.memo ?? '') ||
    imageUrl !== (todo.imageUrl ?? '');

  const handleUpdate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert('할 일 이름을 입력해주세요.');
      return;
    }

    const dto: UpdateTodoDto = { name: trimmedName, isCompleted, memo };
    if (imageUrl) dto.imageUrl = imageUrl;

    update(dto, {
      onSuccess: () => router.push('/'),
      onError: (err) => alert(`수정에 실패했습니다.\n${err.message}`),
    });
  };

  const handleDelete = () => {
    remove(todo.id, {
      onSuccess: () => router.push('/'),
      onError: (err) => alert(`삭제에 실패했습니다.\n${err.message}`),
    });
  };

  const isBusy = isUpdating || isDeleting;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <CheckListDetail
        name={name}
        isCompleted={isCompleted}
        onNameChange={setName}
        onToggle={() => setIsCompleted((prev) => !prev)}
      />

      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
        <ImageUploader imageUrl={imageUrl} onChange={setImageUrl} />
        <MemoEditor value={memo} onChange={setMemo} />
      </div>

      <div className="flex gap-[7px] md:justify-center md:gap-4 lg:justify-end">
        <Button
          variant="edit"
          active={isDirty}
          onClick={handleUpdate}
          disabled={isBusy}
          className="flex-1 md:w-[164px] md:flex-none"
        >
          수정 완료
        </Button>
        <Button
          variant="delete"
          onClick={handleDelete}
          disabled={isBusy}
          className="flex-1 md:w-[164px] md:flex-none"
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}

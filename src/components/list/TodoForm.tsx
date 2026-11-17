'use client';

import { useState, type FormEvent } from 'react';
import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';
import { useCreateTodo } from '@/hooks/useTodos';

/**
 * 상단 할 일 입력 폼.
 * <form onSubmit> 하나로 처리하므로 "추가하기" 클릭과 Enter 입력이 같은 경로로 동작한다.
 * (form submit 은 한글 IME 조합 중 Enter 로 인한 중복 입력 문제도 발생하지 않는다)
 */
export default function TodoForm() {
  // useState: 화면이 기억하는 값. name 은 현재 입력값, setName 으로 바꾸면 화면이 다시 그려진다.
  const [name, setName] = useState('');
  const { mutate: create, isPending } = useCreateTodo();
  const hasValue = name.trim().length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasValue || isPending) return;

    create(name.trim(), {
      onSuccess: () => setName(''),
      onError: (err) => alert(err.message),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 md:gap-4">
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="할 일을 입력해주세요"
        aria-label="새 할 일"
        maxLength={100}
      />
      <Button
        type="submit"
        variant="add"
        active={hasValue}
        iconOnlyOnMobile
        disabled={isPending}
        aria-label="추가하기"
        className="w-[55px] md:w-[158px] lg:w-[164px]"
      >
        추가하기
      </Button>
    </form>
  );
}

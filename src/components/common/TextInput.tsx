import type { InputHTMLAttributes } from 'react';

/**
 * 공용 입력창 (Figma "search").
 * 버튼과 같은 둥근 테두리 + 오프셋 그림자 스타일을 사용한다.
 */
export default function TextInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={`shadow-offset h-[52px] w-full min-w-0 rounded-3xl border-2 border-slate-900 bg-slate-100 px-6 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:bg-white ${className}`}
      {...props}
    />
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { CheckIcon, PlusIcon, XIcon } from './Icons';

/**
 * 공용 버튼 (Figma "btn" 컴포넌트).
 *
 * - add    : 추가하기 — 기본 slate-200, 활성(입력값 있음) violet-600
 * - edit   : 수정 완료 — 기본 slate-200, 활성(변경사항 있음) lime-300
 * - delete : 삭제하기 — rose-500
 *
 * 둥근 테두리 + 오른쪽 아래로 밀린 검정 그림자가 공통 스타일이다.
 * `iconOnlyOnMobile` 을 주면 모바일(744px 미만)에서는 라벨을 숨기고 아이콘만 보여준다.
 */
type Variant = 'add' | 'edit' | 'delete';

// props(부모가 넘겨주는 값)의 모양. extends ButtonHTMLAttributes 덕분에 onClick, disabled 같은
// 일반 <button> 속성도 그대로 받을 수 있다. `?` 가 붙은 값은 생략 가능.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  active?: boolean;
  iconOnlyOnMobile?: boolean;
  children: ReactNode;
}

const ICONS: Record<Variant, ReactNode> = {
  add: <PlusIcon />,
  edit: <CheckIcon />,
  delete: <XIcon />,
};

const COLORS: Record<Variant, { base: string; active: string }> = {
  add: { base: 'bg-slate-200 text-slate-900', active: 'bg-violet-600 text-white' },
  edit: { base: 'bg-slate-200 text-slate-900', active: 'bg-lime-300 text-slate-900' },
  delete: { base: 'bg-rose-500 text-white', active: 'bg-rose-500 text-white' },
};

export default function Button({
  variant,
  active = false,
  iconOnlyOnMobile = false,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const color = active ? COLORS[variant].active : COLORS[variant].base;

  return (
    <button
      type={type}
      className={`shadow-offset flex h-[52px] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-3xl border-2 border-slate-900 text-base font-bold transition-[transform,box-shadow,background-color] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed ${color} ${className}`}
      {...props}
    >
      {ICONS[variant]}
      <span className={iconOnlyOnMobile ? 'hidden md:inline' : ''}>{children}</span>
    </button>
  );
}

/**
 * Figma 아이콘(ic/plus, ic/check, ic/X, ic/edit)을 currentColor 로 다시 그린 아이콘 모음.
 * 부모의 text 색상을 따라가므로 버튼 상태(기본/활성)에 따라 색이 자동으로 바뀐다.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function PlusIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M2 8h12M8 14V2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M2 7l4.5 4.5L14 4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function EditIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M13.3098 3.86603C13.586 3.38773 14.1975 3.22386 14.6758 3.5L18.0481 5.44698C18.5264 5.72312 18.6903 6.33471 18.4141 6.81301L11.1837 19.3366C11.072 19.5299 10.8989 19.6803 10.6919 19.7639L7.12194 21.2048C6.81834 21.3273 6.48085 21.1299 6.43891 20.8052L5.95038 17.0233C5.92229 16.8058 5.96647 16.5851 6.07612 16.3952L13.3098 3.86603Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlusLargeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M3 12h18M12 21V3" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

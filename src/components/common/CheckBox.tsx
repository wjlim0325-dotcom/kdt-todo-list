import Image from 'next/image';

/**
 * 원형 체크 버튼 (Figma "ic/checkbox").
 * 진행 중: 빈 원 / 완료: 보라색 원 + 체크.
 */
interface CheckBoxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
}

export default function CheckBox({ checked, onToggle, label = '할 일' }: CheckBoxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={`${label} ${checked ? '진행 중으로 변경' : '완료로 변경'}`}
      onClick={onToggle}
      className="shrink-0 cursor-pointer rounded-full transition-transform hover:scale-105"
    >
      <Image
        src={checked ? '/images/ic-checkbox-on.svg' : '/images/ic-checkbox-off.svg'}
        alt=""
        width={32}
        height={32}
      />
    </button>
  );
}

import CheckBox from '@/components/common/CheckBox';

/**
 * 상세 페이지 상단의 할 일 이름 + 상태 영역 (Figma "check-list-detail").
 * 이름은 밑줄 친 입력창으로 바로 수정할 수 있고, 체크 버튼으로 진행/완료를 바꾼다.
 * 완료 상태일 때 배경이 violet-200 으로 바뀐다.
 */
interface CheckListDetailProps {
  name: string;
  isCompleted: boolean;
  onNameChange: (name: string) => void;
  onToggle: () => void;
}

export default function CheckListDetail({ name, isCompleted, onNameChange, onToggle }: CheckListDetailProps) {
  return (
    <div
      className={`flex h-16 items-center justify-center gap-4 rounded-3xl border-2 border-slate-900 px-4 transition-colors ${
        isCompleted ? 'bg-violet-200' : 'bg-white'
      }`}
    >
      <CheckBox checked={isCompleted} label={name} onToggle={onToggle} />

      {/* 입력 내용 길이에 맞춰 너비가 늘어나도록 숨김 span 과 input 을 같은 grid 칸에 겹쳐 둔다 */}
      <label className="inline-grid min-w-0 text-xl font-bold text-slate-900 underline underline-offset-4">
        <span className="invisible col-start-1 row-start-1 overflow-hidden whitespace-pre" aria-hidden>
          {name || '할 일 이름'}
        </span>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="할 일 이름"
          aria-label="할 일 이름"
          maxLength={100}
          className="col-start-1 row-start-1 w-full min-w-[2ch] bg-transparent underline outline-none placeholder:text-slate-400"
        />
      </label>
    </div>
  );
}

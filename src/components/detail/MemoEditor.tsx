/**
 * 메모 입력 영역 (Figma "img/memo").
 * 줄노트 배경 위에 가운데 정렬 textarea 를 두고, 내용이 넘치면 내부 스크롤된다.
 */
interface MemoEditorProps {
  value: string;
  onChange: (memo: string) => void;
}

export default function MemoEditor({ value, onChange }: MemoEditorProps) {
  return (
    <div className="memo-lines flex h-[311px] w-full flex-col rounded-3xl px-4 pt-6 pb-4">
      <label htmlFor="memo" className="text-center text-base font-extrabold text-amber-800">
        Memo
      </label>
      <textarea
        id="memo"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="메모를 입력해주세요"
        className="memo-scroll mt-4 flex-1 resize-none bg-transparent pr-2 text-center text-base leading-8 text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

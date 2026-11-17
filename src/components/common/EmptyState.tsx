import Image from 'next/image';

/**
 * 목록이 비었을 때 보여주는 일러스트 + 안내 문구.
 * 모바일에서는 120px, 태블릿 이상에서는 240px 일러스트를 사용한다.
 */
interface EmptyStateProps {
  type: 'todo' | 'done';
}

const MESSAGES = {
  todo: '할 일이 없어요.\nTODO를 새롭게 추가해주세요!',
  done: '아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!',
};

export default function EmptyState({ type }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-2 md:gap-6">
      <Image src={`/images/empty-${type}-sm.svg`} alt="" width={120} height={120} className="md:hidden" />
      <Image src={`/images/empty-${type}-lg.svg`} alt="" width={240} height={240} className="hidden md:block" />
      <p className="text-center text-base font-bold whitespace-pre-line text-slate-400">{MESSAGES[type]}</p>
    </div>
  );
}

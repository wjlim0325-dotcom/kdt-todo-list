import Image from 'next/image';

/**
 * 상단 내비게이션 바.
 * 요구사항상 로고 클릭 시 "/" 로 이동하며 새로고침되어야 하므로
 * 클라이언트 라우팅(next/link)이 아닌 일반 <a> 태그를 사용한다.
 */
export default function GNB() {
  return (
    <header className="sticky top-0 z-10 h-[60px] border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1200px] items-center px-4 md:px-6 lg:px-0">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- 새로고침 이동이 요구사항 */}
        <a href="/" aria-label="홈으로 이동 (새로고침)">
          <Image src="/images/logo-sm.svg" alt="do it;" width={71} height={40} className="md:hidden" priority />
          <Image src="/images/logo-lg.svg" alt="do it;" width={151} height={40} className="hidden md:block" priority />
        </a>
      </div>
    </header>
  );
}

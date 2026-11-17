import type { Metadata } from 'next';
import GNB from '@/components/common/GNB';
import Providers from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'do it; — Todo List',
  description: '할 일 목록을 관리하는 To Do 서비스',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* 디자인 시안 폰트: NanumSquare (네이버 한글 웹폰트 CDN) */}
        <link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css" />
      </head>
      <body className="antialiased">
        <Providers>
          <GNB />
          {children}
        </Providers>
      </body>
    </html>
  );
}

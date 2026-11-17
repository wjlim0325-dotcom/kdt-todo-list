# do it; — Todo List

할 일 목록을 관리하는 To Do 서비스입니다.
할 일을 추가하고, 진행 중 / 완료 상태를 나누어 보고, 상세 페이지에서 이름·상태·메모·이미지를 수정하거나 삭제할 수 있습니다.

- 배포 링크: https://kdt-todo-list.vercel.app
- API: https://assignment-todolist-api.vercel.app/docs/

> 📖 **Next.js / TypeScript 가 처음이라면** → [코드 읽기 가이드 (docs/GUIDE.md)](docs/GUIDE.md) 를 먼저 읽어주세요.
> 파일 연결 다이어그램, 핵심 개념 10개, 기능별 코드 흐름을 그림과 함께 설명합니다.
>
> 🚀 **GitHub 업로드 / Vercel 배포 방법** → [배포 가이드 (docs/DEPLOY.md)](docs/DEPLOY.md)

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router), React 19 |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 서버 상태 관리 | TanStack Query v5 |

## 주요 기능

### 할 일 목록 페이지 (`/`)
- 로고 클릭 시 `/` 로 새로고침 이동
- 진행 중(TO DO) / 완료(DONE) 할 일을 나누어 표시, 비어 있으면 안내 일러스트 표시
- 상단 입력창에 입력 후 `추가하기` 버튼 또는 Enter 로 할 일 추가
- 항목 왼쪽 체크 버튼으로 완료 ↔ 진행 중 전환 (낙관적 업데이트)

### 할 일 상세 페이지 (`/items/{itemId}`)
- 할 일 이름, 진행/완료 상태, 메모 수정
- 이미지 1개 첨부 (파일 이름은 영문·숫자·`_`·`-` 만, 5MB 이하)
- `수정 완료` 시 변경 사항 반영 후 목록으로 이동 (변경 사항이 있으면 버튼이 초록색으로 활성화)
- `삭제하기` 시 삭제 후 목록으로 이동

### 공통
- Figma 시안의 컬러 시스템을 Tailwind 테마 토큰으로 등록 (`src/app/globals.css`)
- 반응형: 모바일(< 744px) / 태블릿(744px ~) / 데스크탑(1200px ~)

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. (선택) tenantId 설정 — 미설정 시 기본값 사용
cp .env.example .env.local

# 3. 개발 서버 실행 → http://localhost:3000
npm run dev
```

| 스크립트 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |

### 환경 변수

| 이름 | 설명 |
|---|---|
| `NEXT_PUBLIC_TENANT_ID` | API 요청에 사용할 본인 식별자. `https://assignment-todolist-api.vercel.app/api/{tenantId}` 로 요청됩니다. |

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx               # 공통 레이아웃 (GNB, 폰트, React Query Provider)
│  ├─ providers.tsx            # React Query Provider
│  ├─ page.tsx                 # 할 일 목록 페이지
│  ├─ items/[itemId]/page.tsx  # 할 일 상세 페이지
│  └─ globals.css              # 컬러 시스템 / breakpoint 토큰
├─ apis/
│  ├─ client.ts                # fetch 래퍼 (baseURL, 에러 처리)
│  └─ todo.ts                  # 할 일 / 이미지 업로드 API
├─ hooks/useTodos.ts           # React Query 훅 (조회, 추가, 토글, 수정, 삭제, 업로드)
├─ components/
│  ├─ common/                  # 공용 컴포넌트: Button, TextInput, CheckBox, EmptyState, GNB, Icons
│  ├─ list/                    # 목록: TodoForm, TodoSection, TodoItem
│  └─ detail/                  # 상세: TodoDetailForm, CheckListDetail, ImageUploader, MemoEditor
├─ utils/validateImage.ts      # 이미지 파일명/용량 검사
└─ types/todo.ts               # API 타입
```

## 구현 메모

- **로고 새로고침**: `next/link` 는 클라이언트 라우팅이라 새로고침이 되지 않으므로 일반 `<a href="/">` 를 사용했습니다.
- **추가 시 Enter**: `<form onSubmit>` 으로 처리해 버튼 클릭과 Enter 가 같은 경로로 동작하고, 한글 조합 중 Enter 중복 입력 문제가 없습니다.
- **목록 개수**: API 의 `pageSize` 기본값이 10이라 넉넉한 값으로 요청해 모든 항목이 보이도록 했습니다.
- **상세 데이터**: 재방문 시 메모와 이미지가 항상 최신으로 보이도록 상세 조회는 캐시를 신뢰하지 않고 매번 다시 받아옵니다.

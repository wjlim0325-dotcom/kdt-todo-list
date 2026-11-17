/**
 * API 공통 요청 함수.
 * 모든 요청은 https://assignment-todolist-api.vercel.app/api/{tenantId} 아래로 전송된다.
 */
const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';
// 다른 지원자와 데이터가 섞이지 않도록 고유한 tenantId 를 사용한다 (.env 로 변경 가능)
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || 'doit-todo-a7k3';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;

  const res = await fetch(`${BASE_URL}/${TENANT_ID}${path}`, {
    ...init,
    // FormData 는 브라우저가 boundary 포함 Content-Type 을 직접 설정해야 하므로 지정하지 않는다
    headers: isFormData ? init?.headers : { 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
  });

  if (!res.ok) {
    let message = `요청에 실패했습니다. (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* 응답 바디가 JSON 이 아닌 경우 기본 메시지 사용 */
    }
    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}

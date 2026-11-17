/*
 * interface: 데이터의 "모양"을 적어 둔 설계도. 실행에는 영향이 없고,
 * 잘못된 이름·종류의 값을 쓰면 VS Code 가 저장 전에 빨간 줄로 알려준다.
 */

/** 목록 조회(GET /items) 응답의 항목 */
export interface TodoListItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

/** 상세 조회(GET /items/{id}) 응답 */
export interface TodoDetail extends TodoListItem {
  tenantId: string;
  memo: string | null;
  imageUrl: string | null;
}

/** 수정(PATCH /items/{id}) 요청 바디 — 보낸 필드만 반영된다 */
export interface UpdateTodoDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

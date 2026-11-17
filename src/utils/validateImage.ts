export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/** 파일 이름(확장자 제외)은 영문자 기반이며, 숫자와 '_', '-' 만 추가로 허용한다. 한글·공백 등은 불가. */
const ENGLISH_FILE_NAME = /^[A-Za-z0-9_-]+$/;

/**
 * 업로드할 이미지 파일을 검사한다.
 * @returns 문제가 있으면 사용자에게 보여줄 에러 메시지, 통과하면 null
 */
export function validateImage(file: File): string | null {
  if (!file.type.startsWith('image/')) {
    return '이미지 파일만 업로드할 수 있습니다.';
  }

  const dotIndex = file.name.lastIndexOf('.');
  const baseName = dotIndex > 0 ? file.name.slice(0, dotIndex) : file.name;
  if (!ENGLISH_FILE_NAME.test(baseName) || !/[A-Za-z]/.test(baseName)) {
    return '이미지 파일 이름은 영어로만 이루어져야 합니다.';
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return '이미지 파일 크기는 5MB 이하여야 합니다.';
  }

  return null;
}

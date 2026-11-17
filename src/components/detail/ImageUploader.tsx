'use client';

import Image from 'next/image';
import { useRef, type ChangeEvent } from 'react';
import { EditIcon, PlusLargeIcon } from '@/components/common/Icons';
import { useUploadImage } from '@/hooks/useTodos';
import { validateImage } from '@/utils/validateImage';

/**
 * 할 일 이미지 첨부 영역 (최대 1개).
 * - 이미지가 없으면 점선 박스 + 가운데 이미지 아이콘 + 오른쪽 아래 "+" 버튼
 * - 이미지가 있으면 이미지를 꽉 채워 보여주고 "수정(연필)" 버튼으로 교체
 * 파일을 고르면 이름(영문)/크기(5MB 이하)를 검사한 뒤 즉시 업로드하고, 받은 URL 을 부모에 전달한다.
 */
interface ImageUploaderProps {
  imageUrl: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ imageUrl, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending } = useUploadImage();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // 같은 파일을 다시 골라도 change 이벤트가 발생하도록 초기화
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }

    upload(file, {
      onSuccess: ({ url }) => onChange(url),
      onError: (err) => alert(`이미지 업로드에 실패했습니다.\n${err.message}`),
    });
  };

  return (
    <div
      className={`relative h-[311px] w-full shrink-0 overflow-hidden rounded-3xl lg:w-[384px] ${
        imageUrl ? '' : 'border-2 border-dashed border-slate-300 bg-slate-50'
      }`}
    >
      {imageUrl ? (
        // 업로드 서버 도메인이 고정되어 있지 않아 Next 이미지 최적화는 사용하지 않는다
        <Image src={imageUrl} alt="첨부 이미지" fill unoptimized className="object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Image src="/images/ic-img.svg" alt="" width={64} height={64} />
        </div>
      )}

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 font-bold text-slate-500">
          업로드 중...
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        aria-label={imageUrl ? '이미지 변경' : '이미지 추가'}
        className={`absolute right-4 bottom-4 flex size-16 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105 ${
          imageUrl ? 'border-2 border-slate-900 bg-slate-900/50 text-white' : 'bg-slate-200 text-slate-500'
        }`}
      >
        {imageUrl ? <EditIcon /> : <PlusLargeIcon />}
      </button>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}

import 'server-only';

import { createAdminClient } from '@/app/lib/supabase/admin';
import {
  ADMIN_PRODUCT_LIVE_PREFIX,
  ADMIN_PRODUCT_TMP_PREFIX,
  PRODUCT_IMAGE_BUCKET,
} from '@/constants';
import { SUPABASE_URL } from '@/constants/public';

// 스토리지 경로 정규화
const normalizeStoragePath = (path: string): string | null => {
  const normalized = path
    .replace(/\\/g, '/')
    .trim()
    .replace(/^\/+|\/+$/g, '');
  if (!normalized) return null;

  const segments = normalized.split('/');
  if (
    segments.some((segment) => !segment || segment === '.' || segment === '..')
  ) {
    return null;
  }

  return segments.join('/');
};

// 공개 URL에서 안전한 스토리지 경로 추출
export const getSafeStoragePathFromPublicUrl = (
  imageUrl: string | null | undefined,
  bucket: string,
) => {
  if (!imageUrl) return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const markerIndex = imageUrl.indexOf(marker);
  if (markerIndex === -1) return null;

  const rawPath = imageUrl.slice(markerIndex + marker.length).split('?')[0];
  if (!rawPath) return null;

  try {
    return normalizeStoragePath(decodeURIComponent(rawPath));
  } catch {
    return null;
  }
};

// 스토리지 경로에서 공개 URL 생성
const getPublicUrlFromPath = (path: string) => {
  if (!SUPABASE_URL) return '';
  return `${SUPABASE_URL}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${path}`;
};

// 임시 이미지 확정
export const finalizeTmpImageIfNeeded = async (imageUrl: string) => {
  const imagePath = getSafeStoragePathFromPublicUrl(
    imageUrl,
    PRODUCT_IMAGE_BUCKET,
  );
  if (!imagePath || !imagePath.startsWith(ADMIN_PRODUCT_TMP_PREFIX)) {
    return imageUrl;
  }

  const fileName = imagePath.slice(ADMIN_PRODUCT_TMP_PREFIX.length);
  if (!fileName || fileName.includes('/')) {
    throw new Error('허용되지 않은 임시 이미지 경로입니다.');
  }

  const extension = fileName.split('.').pop() || 'png';
  const finalPath = `${ADMIN_PRODUCT_LIVE_PREFIX}${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}.${extension}`;

  const adminClient = createAdminClient();
  const { error } = await adminClient.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .move(imagePath, finalPath);

  if (error) {
    throw new Error(`임시 이미지 확정 실패: ${error.message}`);
  }

  return getPublicUrlFromPath(finalPath);
};

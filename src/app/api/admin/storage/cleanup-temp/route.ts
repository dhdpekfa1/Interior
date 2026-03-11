import { NextResponse } from 'next/server';
import { createAdminClient } from '@/app/lib/supabase/admin';
import { getAdminUser } from '@/lib/admin-auth';
import { ADMIN_PRODUCT_TMP_PREFIX, PRODUCT_IMAGE_BUCKET } from '@/constants';

const DEFAULT_CLEANUP_HOURS = 24;
const MIN_CLEANUP_HOURS = 1;
const MAX_CLEANUP_HOURS = 24 * 30;

const isAuthorizedCronRequest = (req: Request) => {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;
  return authHeader.slice(7) === cronSecret;
};

const parseCleanupHours = (rawHours: string | null): number => {
  const parsed = Number(rawHours);
  if (!Number.isFinite(parsed)) return DEFAULT_CLEANUP_HOURS;
  const normalized = Math.floor(parsed);
  if (normalized < MIN_CLEANUP_HOURS) return MIN_CLEANUP_HOURS;
  if (normalized > MAX_CLEANUP_HOURS) return MAX_CLEANUP_HOURS;
  return normalized;
};

const handleCleanupTemp = async (req: Request) => {
  const isCronCall = isAuthorizedCronRequest(req);
  if (!isCronCall) {
    const adminUser = await getAdminUser();
    if (!adminUser) {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 401 },
      );
    }
  }

  const adminClient = createAdminClient();
  const { searchParams } = new URL(req.url);
  const hours = parseCleanupHours(searchParams.get('hours'));
  const cutoff = Date.now() - hours * 60 * 60 * 1000;

  const { data: listedFiles, error: listError } = await adminClient.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .list(ADMIN_PRODUCT_TMP_PREFIX, {
      limit: 1000,
      sortBy: { column: 'created_at', order: 'asc' },
    });

  if (listError) {
    return NextResponse.json(
      { error: '임시 파일 목록 조회 실패', details: listError.message },
      { status: 500 },
    );
  }

  const staleTargets = (listedFiles ?? [])
    .filter((file) => {
      const createdAt = file.created_at ? new Date(file.created_at).getTime() : 0;
      return createdAt > 0 && createdAt < cutoff;
    })
    .map((file) => `${ADMIN_PRODUCT_TMP_PREFIX}${file.name}`);

  if (staleTargets.length === 0) {
    return NextResponse.json({
      success: true,
      removedCount: 0,
      message: '삭제할 임시 파일이 없습니다.',
    });
  }

  const { error: removeError } = await adminClient.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .remove(staleTargets);

  if (removeError) {
    return NextResponse.json(
      { error: '임시 파일 삭제 실패', details: removeError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    removedCount: staleTargets.length,
  });
};

export async function GET(req: Request) {
  return handleCleanupTemp(req);
}

export async function POST(req: Request) {
  return handleCleanupTemp(req);
}

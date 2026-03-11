import { NextResponse } from 'next/server';

export const unauthorized = () =>
  NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 401 });

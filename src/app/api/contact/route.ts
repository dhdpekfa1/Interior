import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { categoryLabel, email, phone, message } = await req.json();

    const res = await resend.emails.send({
      // TODO: 발신자 인증된 도메인으로 설정 -> https://resend.com/domains에서 도메인 추가 후 from 변경
      from: 'yourname@resend.dev', // Resend의 기본 발신 도메인 -> 변경 필요
      to: ['dhdpekfa1@daum.net'], // TODO: 문의 내용을 받을 수신자 이메일 작성 -> 개인 이메일 가능
      replyTo: email,
      subject: '📩 새로운 문의가 도착했습니다!',
      text: `📌 문의 유형: ${categoryLabel}\n 📧 이메일: ${email}\n📞 연락처: ${phone}\n\n📝 문의 내용:\n${message}`,
    });

    console.log('📩 이메일 전송 응답:', res);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ 문의 메일 전송 실패:', error);

    return NextResponse.json(
      { error: '메일 전송 실패', details: error },
      { status: 500 }
    );
  }
}

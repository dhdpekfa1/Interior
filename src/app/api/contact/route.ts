import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { categoryLabel, email, phone, message, products } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      replyTo: email,
      to: 'dudeo4444@daum.net',
      cc: ['qhdkwm2@nate.com'],
      subject: '📩 새로운 문의가 도착했습니다!',
      text: `📌 문의 유형: ${categoryLabel}\n📧이메일: ${email}\n📞 연락처: ${phone}\n\n📝문의 내용: ${message}\n\n상품 목록:\n${products
        .map(
          (p: { name: string; count: number }) => `- ${p.name} (${p.count}개)`,
        )
        .join('\n')}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
    return NextResponse.json(
      { error: '메일 전송 실패', details: error },
      { status: 500 },
    );
  }
}

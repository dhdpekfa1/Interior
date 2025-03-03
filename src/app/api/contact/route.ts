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
      to: 'yourmail@example.com',
      subject: '📩 새로운 문의가 도착했습니다!',
      text: `📌 문의 유형: ${categoryLabel}\n📧이메일: ${email}\n📞 연락처: ${phone}\n\n📝문의 내용: ${message}\n\n상품 목록:\n${products
        .map(
          (p: { name: string; count: number }) => `- ${p.name} (${p.count}개)`
        )
        .join('\n')}`,
    };

    // const mailOptions = {
    //   from: process.env.EMAIL_USER, // 발신자 이메일
    //   to: 'dhdpekfa1@daum.net', // 수신자 이메일 -> TODO: 변경 필요
    //   replyTo: email,
    //   subject: '📩 새로운 문의가 도착했습니다!',
    //   text: `📌 문의 유형: ${categoryLabel}\n📧 이메일: ${email}\n📞 연락처: ${phone}\n\n📝 문의 내용:\n${message}`,
    // };
    console.log(process.env.SMTP_USER, process.env.SMTP_PASS);
    await transporter.sendMail(mailOptions);

    console.log('✅ 이메일 전송 완료');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
    return NextResponse.json(
      { error: '메일 전송 실패', details: error },
      { status: 500 }
    );
  }
}

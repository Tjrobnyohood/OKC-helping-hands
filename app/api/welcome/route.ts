import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const data = await resend.emails.send({
      from: 'OKC Helping Hands <missions@yourdomain.com>',
      to: [email],
      subject: 'Field Ops Activated ⚡️',
      html: `<h1>Welcome to the Mission, ${name}!</h1><p>Your admin access is live.</p>`
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
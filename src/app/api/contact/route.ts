import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, relationship, message } = body;

    const { error: resendError } = await resend.emails.send({

      from: 'Rompa House Contact Form <onboarding@resend.dev>',
      to: ['williesdrive@gmail.com'],
      replyTo: email,
      subject: `New Inquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C5F8A;">New Contact Form Submission</h2>
          <hr style="border-color: #D4E2EE;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Name</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Phone</td><td>${phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Relationship</td><td>${relationship || 'Not specified'}</td></tr>
          </table>
          <hr style="border-color: #D4E2EE;" />
          <h3 style="color: #2C5F8A;">Message</h3>
          <p style="color: #1E2D3D; line-height: 1.6;">${message || 'No message provided.'}</p>
          <hr style="border-color: #D4E2EE;" />
          <p style="color: #5A7A94; font-size: 12px;">Sent via rompahouse.com contact form</p>
        </div>
      `,
    });

    if (resendError) {
      console.error('Resend error:', resendError);
      return NextResponse.json({ error: resendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

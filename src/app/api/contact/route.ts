import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, relationship, message } = body;
    const { error: resendError } = await resend.emails.send({
      from: 'Rompa House Contact Form <onboarding@resend.dev>',
      to: ['contact@rompahouse.com'],
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

    // Auto-reply — fails silently until domain is verified in Resend
    try { await resend.emails.send({
      from: 'Rompa House <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your inquiry — Rompa House Assisted Living',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1E2D3D;">
          <div style="background: #2C5F8A; padding: 32px 40px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Rompa House Assisted Living</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">A home. A family. A purpose.</p>
          </div>
          <div style="background: #ffffff; padding: 36px 40px; border: 1px solid #D4E2EE; border-top: none;">
            <p style="font-size: 18px; font-weight: 600; margin: 0 0 16px;">Hi ${firstName}, thank you for reaching out!</p>
            <p style="line-height: 1.7; color: #5A7A94;">We've received your inquiry and a member of our admissions team will be in touch with you within <strong style="color: #1E2D3D;">one business day</strong>.</p>
            <p style="line-height: 1.7; color: #5A7A94;">In the meantime, if you have an urgent question, please don't hesitate to call us directly.</p>
            <div style="background: #EEF4F9; border-radius: 10px; padding: 20px 24px; margin: 24px 0;">
              <p style="margin: 0 0 8px; font-weight: 600; color: #2C5F8A;">Contact Us Directly</p>
              <p style="margin: 0 0 4px; font-size: 14px;">📞 <a href="tel:+15093815858" style="color: #2C5F8A; text-decoration: none;">(509) 381-5858</a></p>
              <p style="margin: 0 0 4px; font-size: 14px;">✉️ <a href="mailto:contact@rompahouse.com" style="color: #2C5F8A; text-decoration: none;">contact@rompahouse.com</a></p>
              <p style="margin: 0; font-size: 14px;">📍 2116 E 1st Ave, Spokane, WA 99202</p>
            </div>
            <p style="line-height: 1.7; color: #5A7A94;">We look forward to speaking with you and learning how we can best support your family.</p>
            <p style="margin: 24px 0 0; color: #1E2D3D; font-weight: 600;">Warm regards,<br/>The Rompa House Team</p>
          </div>
          <div style="background: #EEF4F9; padding: 16px 40px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #5A7A94;">Rompa House Assisted Living · Licensed Care Facility · Spokane, WA</p>
          </div>
        </div>
      `,
    }); } catch { /* auto-reply failed silently */ }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

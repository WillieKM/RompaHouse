import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\r\n\t]/g, ' ').trim() : '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();

    // Honeypot: real visitors never fill this hidden field, bots often do.
    if (clean(body.company)) {
      return NextResponse.json({ success: true });
    }

    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const relationship = clean(body.relationship);
    const message = clean(body.message);

    if (!firstName || !lastName || !EMAIL_RE.test(email) || !message) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }
    if (firstName.length > 100 || lastName.length > 100 || phone.length > 30 || relationship.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'One or more fields are too long' }, { status: 400 });
    }

    const safe = {
      firstName: escapeHtml(firstName),
      lastName: escapeHtml(lastName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      relationship: escapeHtml(relationship),
      message: escapeHtml(message),
    };

    const { error: resendError } = await resend.emails.send({
      from: 'Rompa House Contact Form <contact@rompahouse.com>',
      to: ['contact@rompahouse.com'],
      replyTo: email,
      subject: `New Inquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C5F8A;">New Contact Form Submission</h2>
          <hr style="border-color: #D4E2EE;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Name</td><td>${safe.firstName} ${safe.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Email</td><td><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Phone</td><td>${safe.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #5A7A94; font-weight: bold;">Relationship</td><td>${safe.relationship || 'Not specified'}</td></tr>
          </table>
          <hr style="border-color: #D4E2EE;" />
          <h3 style="color: #2C5F8A;">Message</h3>
          <p style="color: #1E2D3D; line-height: 1.6;">${safe.message}</p>
          <hr style="border-color: #D4E2EE;" />
          <p style="color: #5A7A94; font-size: 12px;">Sent via rompahouse.com contact form</p>
        </div>
      `,
    });

    if (resendError) {
      console.error('Resend error:', resendError);
      return NextResponse.json({ error: resendError.message }, { status: 500 });
    }

    try { await resend.emails.send({
      from: 'Rompa House <contact@rompahouse.com>',
      to: [email],
      subject: 'We received your inquiry — Rompa House Assisted Living',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1E2D3D;">
          <div style="background: #2C5F8A; padding: 32px 40px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Rompa House Assisted Living</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">A home. A family. A purpose.</p>
          </div>
          <div style="background: #ffffff; padding: 36px 40px; border: 1px solid #D4E2EE; border-top: none;">
            <p style="font-size: 18px; font-weight: 600; margin: 0 0 16px;">Hi ${safe.firstName}, thank you for reaching out!</p>
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

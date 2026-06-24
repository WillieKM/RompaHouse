'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
  moveInTimeline: string;
  message: string;
  company: string;
};

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  relationship: '',
  moveInTimeline: '',
  message: '',
  company: '',
};

const timelineOptions = [
  'Immediately (within 30 days)',
  '1–3 months',
  '3–6 months',
  '6–12 months',
  'Just exploring options',
];

const relationshipOptions = [
  'Adult child / family member',
  'Prospective resident (myself)',
  'Healthcare professional / referral',
  'Other',
];

const whatToExpect = [
  { icon: 'PhoneIcon', step: '1', title: 'Contact Us', desc: 'Call (509) 381-5858 or fill out our form. We\'ll schedule a free tour and answer your questions.' },
  { icon: 'CalendarIcon', step: '2', title: 'Care Assessment', desc: 'Our team meets with your family to understand your loved one\'s medical needs, memory care requirements, and personal preferences.' },
  { icon: 'ClipboardDocumentListIcon', step: '3', title: 'Personalized Care Plan', desc: 'We develop an individualized care plan that becomes the foundation of your loved one\'s care at Rompa House.' },
  { icon: 'HomeIcon', step: '4', title: 'Welcome Home', desc: 'Once paperwork is complete, we personally welcome your loved one home — a warm, comfortable place where they\'ll be known and truly cared for.' },
];

export default function ContactSplit() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.relationship) newErrors.relationship = 'Please select your relationship';
    if (!form.message.trim()) newErrors.message = 'Please include a message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setSendError('Something went wrong. Please call us or try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
            {!submitted ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Get in Touch</h2>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  Fill out the form below and our team will respond promptly. Call or email for free — we'd love to hear from you.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot field: hidden from real users, catches basic bots */}
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />

                  {/* Name row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Margaret"
                        className={`w-full px-4 py-3 bg-input border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[44px] ${errors.firstName ? 'border-red-400' : 'border-border'}`}
                      />
                      {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Sullivan"
                        className={`w-full px-4 py-3 bg-input border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[44px] ${errors.lastName ? 'border-red-400' : 'border-border'}`}
                      />
                      {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="margaret@example.com"
                        className={`w-full px-4 py-3 bg-input border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[44px] ${errors.email ? 'border-red-400' : 'border-border'}`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(503) 555-0182"
                        className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Relationship */}
                  <div>
                    <label htmlFor="relationship" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                      Your Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="relationship"
                      name="relationship"
                      value={form.relationship}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-input border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[44px] ${errors.relationship ? 'border-red-400' : 'border-border'}`}
                    >
                      <option value="">Select your relationship...</option>
                      {relationshipOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.relationship && <p className="text-xs text-red-500 mt-1">{errors.relationship}</p>}
                  </div>

                  {/* Move-in timeline */}
                  <div>
                    <label htmlFor="moveInTimeline" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                      Anticipated Move-In Timeline
                    </label>
                    <select
                      id="moveInTimeline"
                      name="moveInTimeline"
                      value={form.moveInTimeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[44px]"
                    >
                      <option value="">Select a timeline...</option>
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your loved one's situation, any specific care needs, or questions you have..."
                      className={`w-full px-4 py-3 bg-input border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.message ? 'border-red-400' : 'border-border'}`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {sendError && (
                    <p className="text-sm text-red-500 text-center">{sendError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-accent transition-colors shadow-lg hover:shadow-xl min-h-[44px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending...' : 'Send Inquiry'}
                    {!sending && <Icon name="ArrowRightIcon" size={16} />}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respond within 1 business day. Your information is kept private.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircleIcon" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Thank you, {form.firstName}!</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
                  We've received your inquiry and a member of our admissions team will reach out within one business day.
                </p>
                <button
                  onClick={() => { setForm(initialForm); setSubmitted(false); }}
                  className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-full hover:bg-accent transition-colors min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info + Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Contact info */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Visit or Call Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="MapPinIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">Our Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">2116 E 1st Ave<br />Spokane, WA 99202</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="PhoneIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">Phone</p>
                  <a href="tel:+15093815858" className="text-sm text-muted-foreground hover:text-primary transition-colors block">(509) 381-5858</a>
                  <a href="tel:+15096176945" className="text-sm text-muted-foreground hover:text-primary transition-colors block">(509) 617-6945</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="EnvelopeIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">Email</p>
                  <a href="mailto:contact@rompahouse.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">contact@rompahouse.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="ClockIcon" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">Call or Email</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Call or email for free!<br />We're happy to answer any questions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map embed placeholder */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            <div className="relative w-full h-56 bg-muted flex items-center justify-center">
              <iframe
                title="Rompa House Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.0!2d-117.4260!3d47.6588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM5JzMxLjciTiAxMTfCsDI1JzMzLjYiVw!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">2116 E 1st Ave</p>
                <p className="text-xs text-muted-foreground">Spokane, WA 99202</p>
              </div>
              <a
                href="https://maps.google.com/?q=2116+E+1st+Ave+Spokane+WA+99202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors min-h-[44px]"
              >
                Get Directions
                <Icon name="ArrowTopRightOnSquareIcon" size={14} />
              </a>
            </div>
          </div>

          {/* What to Expect mini-timeline */}
          <div className="bg-warm-bg border border-border rounded-3xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">What to Expect</h3>
            <div className="flex flex-col gap-5">
              {whatToExpect.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-md">
                    {step.step}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-foreground mb-0.5">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                  {idx < whatToExpect.length - 1 && (
                    <div className="absolute left-[2.125rem] mt-9 w-px h-5 bg-border" style={{ position: 'relative', left: '-2.9rem', top: '0.5rem', marginRight: '-0.5rem' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
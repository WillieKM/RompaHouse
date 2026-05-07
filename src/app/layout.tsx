import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import '../styles/tailwind.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rompahouse.com';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A2B3C',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Rompa House | Assisted Living & Memory Care in Spokane, WA',
    template: '%s | Rompa House',
  },

  description:
    'Rompa House is a licensed assisted living residence in Spokane, WA, offering personalized adult care, memory support, and dignified daily living in a warm, home-like setting.',

  applicationName: 'Rompa House',

  keywords: [
    'Rompa House',
    'assisted living Spokane WA',
    'memory care Spokane',
    'adult family home Spokane',
    'senior care Spokane',
    'personalized adult care',
    'licensed assisted living Spokane',
    'dementia care Spokane',
    'Alzheimer care Spokane',
    'residential care Spokane',
  ],

  authors: [{ name: 'Rompa House' }],
  creator: 'Rompa House',
  publisher: 'Rompa House',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Rompa House',
    title: 'Rompa House | Assisted Living & Memory Care in Spokane, WA',
    description:
      'Personalized assisted living and memory support in Spokane, WA. Compassionate care in a warm, home-like setting.',
    images: [
      {
        url: '/rompa-living-area.jpeg',
        width: 1200,
        height: 630,
        alt: 'Warm living area at Rompa House in Spokane, WA',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rompa House | Assisted Living & Memory Care in Spokane, WA',
    description:
      'Licensed assisted living and memory support in Spokane, WA, designed around dignity, comfort, and personalized care.',
    images: ['/rompa-living-area.jpeg'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },

  category: 'healthcare',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AssistedLivingResidence',
    name: 'Rompa House',
    url: siteUrl,
    image: `${siteUrl}/rompa-living-area.jpeg`,
    description:
      'Rompa House is a licensed assisted living residence in Spokane, WA, offering personalized adult care and memory support in a warm, home-like setting.',
    telephone: '+15093815858',
    email: 'contact@rompahouse.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2116 E 1st Ave',
      addressLocality: 'Spokane',
      addressRegion: 'WA',
      postalCode: '99202',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'Spokane',
    },
  };

  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}

import '@/styles/globals.css';
import { getBaseURL } from '@lib/util/env';
import { Toaster } from '@medusajs/ui';
import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html data-mode="light" lang="en">
      <body className={`${GeistMono.variable} ${GeistSans.variable} font-sans`}>
        <main className="relative">
          {props.children}
          <Toaster />
          <Analytics />
        </main>
      </body>
    </html>
  );
}

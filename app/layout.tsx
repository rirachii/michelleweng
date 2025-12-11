import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, VT323, Courier_Prime } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt323' });
const courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-courier-prime' });

export const metadata: Metadata = {
  title: 'Michelle Weng - Cyberdeck Portfolio',
  description: 'Portfolio of Michelle Weng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${vt323.variable} ${courierPrime.variable} font-sans`}>{children}</body>
    </html>
  );
}

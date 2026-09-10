import type { Metadata } from 'next';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader, SiteFooter } from './site-shell';
import MotionEffects from './motion-effects';

const geistSans = Manrope({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ProDyum — Digital meets cinema',
  description: 'Digital experiences, brand growth, and cinema. Explore the connected worlds of ProDyum IT and ProDyum Entertainments, Hyderabad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionEffects/>
        <SiteHeader/>
        {children}
        <SiteFooter/>
      </body>
    </html>
  );
}

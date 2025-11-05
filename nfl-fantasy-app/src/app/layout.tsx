import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NFL Fantasy & Predictions Hub',
  description: 'Fantasy football team analyzer, trade evaluator, and NFL season predictions for 2025-2026',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

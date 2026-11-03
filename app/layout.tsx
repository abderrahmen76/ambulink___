import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AmbuLink — Transport médical intelligent',
  description: 'AmbuLink connecte patients, sociétés d\'ambulances privées et cliniques en temps réel, grâce à l\'intelligence artificielle. Sfax, Tunisie.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Lora, Inter } from 'next/font/google';
import './globals.css';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Gratitude Journal',
  description: 'Daily gratitude entries from my AI Builder journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${inter.variable} antialiased bg-[#fdfbf7] text-[#333333] font-serif transition-colors duration-300`}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 min-h-screen flex flex-col">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
              Gratitude Journal
            </h1>
            <p className="mt-4 text-lg text-[#555555] font-sans">
              Documenting the AI journey, one day at a time.
            </p>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="mt-20 pt-8 border-t border-[#e5e0d8] text-center text-[#888888] font-sans text-sm">
            © {new Date().getFullYear()} Lee Delgado
          </footer>
        </div>
      </body>
    </html>
  );
}

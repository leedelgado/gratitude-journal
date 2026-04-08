import type { Metadata } from 'next';
import { Lora, Inter, EB_Garamond } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond' });

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
        className={`${lora.variable} ${inter.variable} ${garamond.variable} antialiased transition-colors duration-300`}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 min-h-screen flex flex-col">
          <header className="mb-16">
            <Link href="/" className="group inline-block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3e2e23] group-hover:text-[#5b4636] transition-colors">
                Gratitude Journal
              </h1>
            </Link>
            <p className="mt-4 text-lg font-sans text-[#8b7d6b] tracking-wide">
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

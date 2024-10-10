import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThemeSwitcher } from "@/components/theme-switcher"
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { SessionProvider } from "@/components/session-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eventzy',
  description: 'A powerful scheduling application for managing your events and meetings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <header className="container mx-auto py-4 px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
                  <Calendar className="h-6 w-6" />
                  <span>Eventzy</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <Link href="/profile">
                    <User className="h-6 w-6" />
                  </Link>
                  <ThemeSwitcher />
                </div>
              </header>
              <main>{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
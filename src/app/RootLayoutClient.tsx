'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { Great_Vibes } from 'next/font/google';
import "./globals.css";
import Aside from "./modules/Aside/Aside";
import Header from "./modules/Header/Header";
import { useInitializeDefaultUser } from "./hooks/useInitializeDefaultUser";
import { AuthProvider } from './contexts/AuthContext';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes'
});

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inicializa o usuário padrão
  useInitializeDefaultUser();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}>
        <body>
          {isLoginPage ? (
            children
          ) : (
            <div className="h-full w-full">
              <header className="h-[5%] w-full">
                <Header/>
              </header>
              <div className="h-[95%] flex w-full">
                <div className="w-[15%] h-full">
                  <Aside />
                </div>
                <main className="flex flex-1 p-4">{children}</main>
              </div>
            </div>
          )}
        </body>
      </html>
    </AuthProvider>
  );
} 
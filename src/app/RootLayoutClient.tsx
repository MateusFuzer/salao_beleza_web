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
  useInitializeDefaultUser();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}>
        {isLoginPage ? (
          children
        ) : (
          <div className="min-h-screen w-full">
            <header className="h-[60px] w-full">
              <Header/>
            </header>
            <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-60px)]">
              <div className="w-full md:w-[250px] md:min-h-full">
                <Aside />
              </div>
              <main className="flex-1 p-2 md:p-4 overflow-x-auto">{children}</main>
            </div>
          </div>
        )}
      </div>
    </AuthProvider>
  );
} 
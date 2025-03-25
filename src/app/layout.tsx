import type { Metadata } from "next";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "Salão da Leila",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GameContextProvider from "@/components/game-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sum Stream",
  description: "Play Sum Stream!",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameContextProvider>{children}</GameContextProvider>
      </body>
    </html>
  );
}

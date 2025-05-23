import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "@/lib/auth/session";
import QueryClientWrapper from "@/providers/query-client.provider";
import { AuthProvider } from "@/providers/auth.context";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crest",
  description: "Your global profile",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  const token = session ? session.value : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white dark`}>
        <QueryClientWrapper>
          <AuthProvider jwt={token}>
            <div className="flex flex-col h-screen overflow-hidden px-5 font-sans">
              {children}
              <Analytics />
              <Toaster />
            </div>
          </AuthProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}

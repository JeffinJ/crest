import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth.context";
import { getServerSession } from "@/lib/auth/session";
import TopBar from "@/components/top-bar";
import QueryClientWrapper from "@/providers/query-client.provider";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-900 text-white`}>
        <QueryClientWrapper>
          <AuthProvider jwt={token}>
            <div className="flex flex-col h-screen overflow-hidden  px-60">
              <TopBar />
              {children}
            </div>
          </AuthProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}

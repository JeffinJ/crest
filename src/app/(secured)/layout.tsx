import "./globals.css";
import { AuthProvider } from "@/providers/auth.context";
import { getServerSession } from "@/lib/auth/session";
import TopBar from "@/components/top-bar";
import QueryClientWrapper from "@/providers/query-client.provider";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession();
    const token = session ? session.value : null;

    return (
        <html lang="en">
            <body
                className={`antialiased bg-stone-900 text-white dark`}>
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

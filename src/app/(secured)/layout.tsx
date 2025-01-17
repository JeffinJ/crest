import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-5 w-full overflow-y-auto">
                {children}
            </main>
        </SidebarProvider>
    );
}

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarTrigger } from "@/components/diy-ui/SidebatTrigger";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarTrigger className="p-0" />
      {children}
    </SidebarProvider>
  );
}

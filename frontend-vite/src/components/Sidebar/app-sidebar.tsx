import {
  QueryStats,
  Person,
  AutoStories,
  School,
  Bookmark,
  Star,
} from "@mui/icons-material";

import { useLocation } from "react-router-dom";

const items = [
  {
    title: "Analysis",
    url: "/analysis",
    icon: <QueryStats fontSize="medium" />,
  },
  {
    title: "Profile",
    url: "/",
    icon: <Person fontSize="medium" />,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: <AutoStories fontSize="medium" />,
  },
  {
    title: "My Academic Plan",
    url: "/plan",
    icon: <School fontSize="medium" />,
  },
  {
    title: "My Bookmarks",
    url: "/bookmark",
    icon: <Bookmark fontSize="medium" />,
  },
  {
    title: "Rate My Course",
    url: "/ratings",
    icon: <Star fontSize="medium" />,
  },
];

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/Theme/mode-toggle";
import GoogleLogin from "@/components/my-components/GoogleLogin";

// Menu items.

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar>
      <SidebarHeader className="space-x-3">
        <GoogleLogin />
      </SidebarHeader>

      <SidebarInset>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Sidebar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        currentPath === item.url ||
                        (currentPath.startsWith(item.url) && item.url !== "/")
                      }
                    >
                      <a href={item.url}>
                        <div className="flex items-center gap-2 w-8 h-8">
                          {item.icon}
                        </div>
                        <span className="text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarInset>
      <SidebarFooter className="h-15 flex gap-2 px-3">
        <div className="flex items-center gap-2">
          <ModeToggle />
          <span className="text-sm">Toggle Mode</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

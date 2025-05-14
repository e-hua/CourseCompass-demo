import {
  Home,
  Person,
  Search,
  School,
  Bookmark,
  Lightbulb,
  Star,
  Settings,
} from "@mui/icons-material";

const items = [
  {
    title: "Profile",
    url: "#",
    icon: <Person fontSize="medium" />,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: <Home fontSize="medium" />,
  },
  {
    title: "Search Courses",
    url: "#",
    icon: <Search fontSize="medium" />,
  },
  {
    title: "My Academic Plan",
    url: "#",
    icon: <School fontSize="medium" />,
  },
  {
    title: "My Bookmarks",
    url: "#",
    icon: <Bookmark fontSize="medium" />,
  },
  {
    title: "Recommendations",
    url: "#",
    icon: <Lightbulb fontSize="medium" />,
  },
  {
    title: "Rate My Course",
    url: "#",
    icon: <Star fontSize="medium" />,
  },
  {
    title: "Settings",
    url: "#",
    icon: <Settings fontSize="medium" />,
  },
];

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/Theme/mode-toggle";

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sidebar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      <SidebarFooter className="h-15 flex gap-2 px-3">
        <div className="flex items-center gap-2">
          <ModeToggle />
          <span className="text-sm">Toggle Mode</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

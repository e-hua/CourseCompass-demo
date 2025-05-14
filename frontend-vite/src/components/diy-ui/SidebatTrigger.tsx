import { Button } from "@/components/ui/button";
import { PanelLeftIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
  iconSize?: number;
}

export function SidebarTrigger({
  className,
  onClick,
  iconSize = 24, // Default size
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon
        className="flex-shrink-0"
        style={{ width: iconSize, height: iconSize }}
      />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

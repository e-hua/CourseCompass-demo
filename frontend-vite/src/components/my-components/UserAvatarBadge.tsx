import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatarBadge({ name }: { name: string }) {
  return (
    <Avatar>
      <AvatarImage src="/avatar-placeholder.png" />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

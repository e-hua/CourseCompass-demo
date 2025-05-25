import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/components/my-components/Dashboard";
interface UserProfileCardProps {
  user: User;
}

export default function UserProfileCard({user}: UserProfileCardProps) {
 return (<Card className="p-6">
  <CardHeader>
    <CardTitle className="text-xl">Welcome back!</CardTitle>
  </CardHeader>
  <CardContent className="flex items-center space-x-4">
    <Avatar>
      <AvatarImage src="/avatar-placeholder.png" />
      <AvatarFallback>{user.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
    <div>
      <div className="text-lg font-semibold">{user.userName}</div>
      <div className="text-sm text-muted-foreground">{user.email}</div>
          <div>
            <strong>Semester:</strong> Y
            {Math.floor((user.currentSemesterIndex + 1) / 2)}S
            {user.currentSemesterIndex % 2 == 0 ? 2 : 1}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Updated:</strong>{" "}
            {new Date(user.updatedAt).toLocaleDateString()}
          </div>
    </div>
  </CardContent>
</Card> )
}

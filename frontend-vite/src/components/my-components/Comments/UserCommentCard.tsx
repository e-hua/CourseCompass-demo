import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { type CommentReadDTO } from "@/apis/CommentAPI";
import { Badge } from "@/components/ui/badge";

interface UserCommentCardProps {
  userComment: CommentReadDTO;
}

export default function UserCommentCard({ userComment }: UserCommentCardProps) {
  return (
    <Card className="border-2 border-primary/40 bg-muted/70">
      <CardContent className="flex flex-row justify-between ">
        <div className="flex space-x-3">
          <Avatar className="mt-2">
            <AvatarFallback>
              {userComment.authorUsername[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="font-medium mt-2.5">{userComment.authorUsername}</div>
          <div className="text-sm font-extralight mt-3">
            {userComment.authorEmail}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Grade: {userComment.letterGrade}</Badge>
            <Badge variant="outline">Diff: {userComment.difficulty}</Badge>
            <Badge variant="outline">WL: {userComment.averageWorkload}</Badge>
            <Badge variant="outline">Enjoy: {userComment.enjoyability}</Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {new Date(userComment.createdAt).toLocaleString()}
        </div>
      </CardContent>

      <CardContent className="flex gap-4 pt-4">
        <div className="flex flex-col gap-1 text-sm">
          <div className="text-muted-foreground">{userComment.content}</div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { type CommentReadDTO } from "@/apis/CommentAPI";
import { Badge } from "@/components/ui/badge";

interface CommentCardProps {
  comment: CommentReadDTO;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between">
        <div className="flex space-x-3">
          <Avatar className="mt-2">
            <AvatarFallback>{comment.authorUsername[0]}</AvatarFallback>
          </Avatar>
          <div className="font-medium mt-2">{comment.authorUsername}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Grade: {comment.letterGrade}</Badge>
            <Badge variant="outline">Diff: {comment.difficulty}</Badge>
            <Badge variant="outline">WL: {comment.averageWorkload}</Badge>
            <Badge variant="outline">Enjoy: {comment.enjoyability}</Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
      </CardContent>

      <CardContent className="flex gap-4 pt-4">
        <div className="flex flex-col gap-1 text-sm">
          <div className="text-muted-foreground">{comment.content}</div>
        </div>
      </CardContent>
    </Card>
  );
}

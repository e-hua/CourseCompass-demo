import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type CommentReplyReadDTO } from "@/apis/CommentReplyAPI";

interface CommentReplyItemProps {
  commentReply: CommentReplyReadDTO;
}

export default function CommentReplyItem({
  commentReply,
}: CommentReplyItemProps) {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex space-x-3">
          <Avatar className="mt-2">
            <AvatarFallback>
              {commentReply.authorUsername[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="font-medium mt-2.5">
            {commentReply.authorUsername}
          </div>
          <div className="text-sm font-extralight mt-3">
            {commentReply.authorEmail}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {new Date(commentReply.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <div className="flex flex-col gap-1 text-sm">
          <div className="text-muted-foreground">{commentReply.content}</div>
        </div>
      </div>
    </div>
  );
}

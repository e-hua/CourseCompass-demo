import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  createCommentReply,
  type CommentReplyReadDTO,
} from "@/apis/CommentReplyAPI";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CommentReplyItemProps {
  commentReply: CommentReplyReadDTO;
  commentId: number;
  setRefreshTrigger: () => void;
}

export default function CommentReplyItem({
  commentReply,
  commentId,
  setRefreshTrigger,
}: CommentReplyItemProps) {
  const [replying, setReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>(
    `[@${commentReply.authorUsername}]`
  );

  const onSubmitReply = async () => {
    try {
      await createCommentReply({
        commentId: commentId,
        content: replyContent,
      });
      setReplying(false);
    } catch (err) {
      toast.error("" + err);
    } finally {
      setRefreshTrigger();
    }
  };

  const onCancelReply = () => {
    setReplying(false);
    setReplyContent(`[@${commentReply.authorUsername}]`);
  };

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

      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setReplying(true);
          }}
          className={
            "flex items-center  text-muted-foreground hover:text-green-600 transition-colors " +
            (replying ? "text-green-600" : "")
          }
        >
          <Reply className="w-4 h-4" />
          <span className="text-sm">Reply</span>
        </Button>
      </div>
      {replying ? (
        <div className="space-x-2 space-y-3">
          <Textarea
            className="w-full"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Type your reply here..."
          />
          <Button onClick={onSubmitReply}> Submit </Button>
          <Button variant="ghost" onClick={onCancelReply}>
            Cancel
          </Button>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

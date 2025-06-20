import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  createCommentReply,
  deleteCommentReply,
  updateCommentReply,
  type CommentReplyReadDTO,
} from "@/apis/CommentReplyAPI";
import { Button } from "@/components/ui/button";
import { Pencil, Reply, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface CommentReplyItemProps {
  commentReply: CommentReplyReadDTO;
  commentId: number;
  setRefreshTrigger: () => void;
}

export default function UserCommentReplyItem({
  commentReply,
  commentId,
  setRefreshTrigger,
}: CommentReplyItemProps) {
  const [updating, setUpdating] = useState<boolean>(false);
  const [content, setContent] = useState<string>(commentReply.content);

  const [replying, setReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>(
    `[@${commentReply.authorUsername}]`
  );

  const onDelete = async () => {
    try {
      await deleteCommentReply({
        commentId: commentId,
        content: commentReply.content,
      });
    } catch (err) {
      toast.error("" + err);
    } finally {
      setRefreshTrigger();
    }
  };

  const onEdit = () => {
    setUpdating(true);
  };

  const onSubmitUpdate = async () => {
    try {
      await updateCommentReply({
        commentId: commentId,
        content: content,
      });
      setUpdating(false);
    } catch (err) {
      toast.error("" + err);
    } finally {
      setRefreshTrigger();
    }
  };

  const onCancel = () => {
    setUpdating(false);
    setContent(commentReply.content);
  };

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
        {updating ? (
          <>
            <Textarea
              className="w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={onSubmitUpdate}> Submit </Button>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <div className="flex flex-col gap-1 text-sm">
            <div className="text-muted-foreground">{commentReply.content}</div>
          </div>
        )}
      </div>

      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="flex items-center  text-muted-foreground hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Delete</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className={
            "flex items-center transition-colors " +
            (updating
              ? "text-green-600 hover:text-green-800"
              : "text-muted-foreground hover:text-green-600")
          }
        >
          <Pencil className="w-4 h-4" />
          <span className="text-sm">Edit</span>
        </Button>

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

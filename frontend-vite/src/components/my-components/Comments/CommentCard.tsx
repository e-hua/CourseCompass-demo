import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { type CommentReadDTO } from "@/apis/CommentAPI";
import { Badge } from "@/components/ui/badge";
import CommentReplyList from "./CommentReplyList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createCommentReply } from "@/apis/CommentReplyAPI";
import { toast } from "sonner";

interface CommentCardProps {
  comment: CommentReadDTO;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const onSubmitReply = async () => {
    try {
      await createCommentReply({
        commentId: comment.id,
        content: content,
      });
      setReplying(false);
    } catch (err) {
      toast.error("" + err);
    } finally {
      setRefreshTrigger(!refreshTrigger);
    }
  };

  const onCancelReply = () => {
    setReplying(false);
    setContent("");
  };

  return (
    <>
      <Card>
        <CardContent className="flex flex-row justify-between">
          <div className="flex space-x-3">
            <Avatar className="mt-2">
              <AvatarFallback>
                {comment.authorUsername[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="font-medium mt-2.5">{comment.authorUsername}</div>
            <div className="text-sm font-extralight mt-3">
              {comment.authorEmail}
            </div>
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

        <CardContent className="flex">
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
        </CardContent>
      </Card>
      {replying ? (
        <div className="space-x-2 space-y-3">
          <Textarea
            className="w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
      <CommentReplyList
        commentId={comment.id}
        setRefreshTrigger={() => setRefreshTrigger(!refreshTrigger)}
        refreshTrigger={refreshTrigger}
      />
    </>
  );
}

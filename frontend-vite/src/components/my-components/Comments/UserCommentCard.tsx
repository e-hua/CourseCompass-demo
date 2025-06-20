import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  deleteComment,
  updateComment,
  type CommentReadDTO,
} from "@/apis/CommentAPI";
import { Badge } from "@/components/ui/badge";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Reply, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createCommentReply } from "@/apis/CommentReplyAPI";
import CommentReplyList from "@/components/my-components/Comments/CommentReplyList";

interface UserCommentCardProps {
  userComment: CommentReadDTO;
  setRefreshTrigger: () => void;
}

export default function UserCommentCard({
  userComment,
  setRefreshTrigger,
}: UserCommentCardProps) {
  const [updating, setUpdating] = useState<boolean>(false);
  const [content, setContent] = useState<string>(userComment.content);
  const [replyRefreshTrigger, setReplyRefreshTrigger] =
    useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");

  const { data: takenCourses } = useTakenCourses();
  const takenCourse = takenCourses?.find(
    (tc) => tc.courseCode === userComment.courseCode
  );

  const onDelete = async () => {
    // The user must had taken this course and make comments on this course to view this comment
    try {
      await deleteComment({
        takenCourseId: takenCourse?.id ?? 0,
        content: userComment.content,
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
      await updateComment({
        takenCourseId: takenCourse?.id ?? 0,
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
    setContent(userComment.content);
  };

  const onSubmitReply = async () => {
    try {
      await createCommentReply({
        commentId: userComment.id,
        content: replyContent,
      });
      setReplying(false);
    } catch (err) {
      toast.error("" + err);
    } finally {
      setReplyRefreshTrigger(!replyRefreshTrigger);
    }
  };

  const onCancelReply = () => {
    setReplying(false);
    setReplyContent("");
  };

  return (
    <>
      <Card className="border-2 border-primary/40 bg-muted/70">
        <CardContent className="flex flex-row justify-between ">
          <div className="flex space-x-3">
            <Avatar className="mt-2">
              <AvatarFallback>
                {userComment.authorUsername[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="font-medium mt-2.5">
              {userComment.authorUsername}
            </div>
            <div className="text-sm font-extralight mt-3">
              {userComment.authorEmail}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">
                Grade: {userComment.letterGrade}
              </Badge>
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
              <div className="text-muted-foreground">{userComment.content}</div>
            </div>
          )}
        </CardContent>

        <CardContent className="flex">
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
        </CardContent>
      </Card>
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
      <CommentReplyList
        commentId={userComment.id}
        setRefreshTrigger={() => setReplyRefreshTrigger(!replyRefreshTrigger)}
        refreshTrigger={replyRefreshTrigger}
      />
    </>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createComment } from "@/apis/CommentAPI";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";

interface PostCommentFormProps {
  courseCode: string;
}

export default function PostCommentForm({ courseCode }: PostCommentFormProps) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: takenCourses } = useTakenCourses();
  const { userProfile } = useUserProfile();

  const takenCourse = takenCourses?.find((tc) => tc.courseCode === courseCode);

  const handleSubmit = async () => {
    if (!takenCourse) {
      toast.error("You must have taken this course to comment.");
      return;
    }

    try {
      setSubmitting(true);
      await createComment({
        takenCourseId: takenCourse.id,
        content: content.trim(),
      });
      toast.success("Comment posted!");
      setContent("");
    } catch (err) {
      toast.error("" + err);
    } finally {
      setSubmitting(false);
    }
  };

  return userProfile ? (
    <div className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your comment here..."
        rows={3}
      />
      <Button onClick={handleSubmit} disabled={submitting || content === ""}>
        {submitting ? "Posting..." : "Post Comment"}
      </Button>
    </div>
  ) : (
    <div className="space-y-2">
      <Textarea
        placeholder="You must login first to write comments !"
        disabled
      />
    </div>
  );
}

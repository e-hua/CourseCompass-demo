import { useEffect, useState } from "react";
import { type CommentReadDTO, readComments } from "@/apis/CommentAPI";
import { Skeleton } from "@/components/ui/skeleton";
import CommentCard from "@/components/my-components/Comments/CommentCard";
import { toast } from "sonner";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import UserCommentCard from "./UserCommentCard";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";

interface CommentListProps {
  courseCode: string;
  refreshTrigger: boolean;
  setRefreshTrigger: () => void;
}

export default function CommentList({
  courseCode,
  refreshTrigger,
  setRefreshTrigger,
}: CommentListProps) {
  const [comments, setComments] = useState<CommentReadDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const takenCourses = useTakenCourses();
  const { userProfile } = useUserProfile();

  useEffect(() => {
    readComments(courseCode)
      .then((x) => setComments(x.reverse()))
      .catch((err) => {
        toast.error("" + err);
        setError("Failed to load comments");
      });
  }, [courseCode, refreshTrigger, takenCourses]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!comments) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_element, index) => (
          <Skeleton
            key={index}
            className="m-10 p-6 mx-auto space-y-5  w-200 h-100"
          />
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return <p className="text-sm text-muted-foreground">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments
        .filter((x) => x.authorEmail === userProfile?.email)
        .map((comment, index) => (
          <UserCommentCard
            key={index}
            userComment={comment}
            setRefreshTrigger={setRefreshTrigger}
          />
        ))}
      {comments
        .filter((x) => x.authorEmail !== userProfile?.email)
        .map((comment, index) => (
          <>
            <CommentCard key={index} comment={comment} />
          </>
        ))}
    </div>
  );
}

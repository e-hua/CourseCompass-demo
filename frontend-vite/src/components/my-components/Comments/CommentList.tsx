import { useEffect, useState } from "react";
import { type CommentReadDTO, readComments } from "@/apis/CommentAPI";
import { Skeleton } from "@/components/ui/skeleton";
import CommentCard from "@/components/my-components/Comments/CommentCard";
import { toast } from "sonner";

interface CommentListProps {
  courseCode: string;
}

export default function CommentList({ courseCode }: CommentListProps) {
  const [comments, setComments] = useState<CommentReadDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    readComments(courseCode)
      .then((x) => setComments(x.reverse()))
      .catch((err) => {
        toast.error("" + err);
        setError("Failed to load comments");
      });
  }, [courseCode]);

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
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
// import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import {
  readCommentReplies,
  type CommentReplyReadDTO,
} from "@/apis/CommentReplyAPI";
import CommentReplyItem from "./CommentReplyItem";

interface CommentReplyListProps {
  commentId: number;
  refreshTrigger: boolean;
  setRefreshTrigger: () => void;
}

export default function CommentReplyList({
  commentId,
  refreshTrigger,
}: // setRefreshTrigger,
CommentReplyListProps) {
  const [commentReplies, setCommentReplies] = useState<
    CommentReplyReadDTO[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  // const { userProfile } = useUserProfile();

  useEffect(() => {
    readCommentReplies(commentId)
      .then((x) => setCommentReplies(x))
      .catch((err) => {
        toast.error("" + err);
        setError("Failed to load comments");
      });
  }, [commentId, refreshTrigger]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!commentReplies) {
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

  if (commentReplies.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No comment reply yet.</p>
    );
  }

  return (
    /*
      {commentReplies
        .filter((x) => x.authorEmail === userProfile?.email)
        .map((comment, index) => (
          <UserCommentCard
            key={index}
            userComment={comment}
            setRefreshTrigger={setRefreshTrigger}
          />
          <></>
        ))}
        */
    <div className="space-y-4">
      {commentReplies
        // .filter((x) => x.authorEmail !== userProfile?.email)
        .map((comment, index) => (
          <>
            <CommentReplyItem key={index} commentReply={comment} />
          </>
        ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
// import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import {
  readCommentReplies,
  type CommentReplyReadDTO,
} from "@/apis/CommentReplyAPI";
import CommentReplyItem from "./CommentReplyItem";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import UserCommentReplyItem from "./UserCommentReplyItem";

interface CommentReplyListProps {
  commentId: number;
  refreshTrigger: boolean;
  setRefreshTrigger: () => void;
}

export default function CommentReplyList({
  commentId,
  refreshTrigger,
  setRefreshTrigger,
}: CommentReplyListProps) {
  const [commentReplies, setCommentReplies] = useState<
    CommentReplyReadDTO[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const { userProfile } = useUserProfile();

  useEffect(() => {
    readCommentReplies(commentId)
      .then((x) => setCommentReplies(x.reverse()))
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
    return <div className="ml-4 pl-4 border-l-2 border-muted space-y-4"></div>;
  }

  return (
    <div className="ml-4 pl-4 border-l-2 border-muted space-y-4">
      {commentReplies.map((commentReply, index) =>
        commentReply.authorEmail === userProfile?.email ? (
          <UserCommentReplyItem
            key={index}
            commentReply={commentReply}
            commentId={commentId}
            setRefreshTrigger={setRefreshTrigger}
          />
        ) : (
          <CommentReplyItem
            key={index}
            commentReply={commentReply}
            commentId={commentId}
            setRefreshTrigger={setRefreshTrigger}
          />
        )
      )}
    </div>
  );
}

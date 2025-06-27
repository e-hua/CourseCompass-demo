import { Card } from "@/components/ui/card";
import { type CourseInfo } from "@/pages/BookMarkPage";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BookmarkCardProps {
  courseInfo: CourseInfo;
}

export default function BookmarkCard({ courseInfo }: BookmarkCardProps) {
  const { userProfile, toggleBookmark } = useUserProfile();
  const navigate = useNavigate();

  const isBookmarked = userProfile?.bookmarkedCourseIds.includes(
    courseInfo?.moduleCode ?? "a"
  );

  const handleClick = () => {
    try {
      navigate("/courses/" + courseInfo.moduleCode);
    } catch (err) {
      toast.error("Failed to open course page. Course not be available." + err);
    }
  };

  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground">
        {courseInfo.moduleCode}
      </div>
      <div className="font-semibold text-lg" onClick={handleClick}>
        {courseInfo.title}
      </div>
      <div className="text-sm line-clamp-3">{courseInfo.description}</div>
      <div className="text-xs text-muted-foreground mt-2">
        {courseInfo.moduleCredit} MCs
      </div>
      <Button
        onClick={() => toggleBookmark(courseInfo.moduleCode)}
        className="flex gap-2 items-center"
      >
        {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </Button>
    </Card>
  );
}

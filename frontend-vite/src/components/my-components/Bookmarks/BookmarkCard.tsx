import { Card } from "@/components/ui/card";
import { type CourseInfo } from "@/pages/BookMarkPage";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";

interface BookmarkCardProps {
  courseInfo: CourseInfo;
}

export default function BookmarkCard({ courseInfo }: BookmarkCardProps) {
  const { userProfile, toggleBookmark } = useUserProfile();

  const isBookmarked = userProfile?.bookmarkedCourseIds.includes(
    courseInfo?.moduleCode ?? "a"
  );

  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground">
        {courseInfo.moduleCode}
      </div>
      <div className="font-semibold text-lg">{courseInfo.title}</div>
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

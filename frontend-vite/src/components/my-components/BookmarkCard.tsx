import { Card } from "@/components/ui/card";
import { type CourseInfo } from "@/pages/BookMarkPage";

export default function BookmarkCard(courseInfo: CourseInfo) {
  return (
    <Card className="p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-sm text-muted-foreground">
        {courseInfo.moduleCode}
      </div>
      <div className="font-semibold text-lg">{courseInfo.title}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {courseInfo.description}
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        {courseInfo.moduleCredit} MCs
      </div>
    </Card>
  );
}

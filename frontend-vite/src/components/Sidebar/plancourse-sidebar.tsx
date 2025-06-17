import { useUserProfile } from '@/components/my-hooks/UserProfileContext';
import { type CourseInfo } from '@/pages/BookMarkPage';
import { useEffect, useState } from 'react';

export default function PlanCourseSidebar() {

  const { userProfile } = useUserProfile();
  const [modules, setModules] = useState<CourseInfo[]>([]);

  useEffect(() => {
    const bookmarked = userProfile?.bookmarkedCourseIds ?? [];
    if (!bookmarked.length) {
      // This was to trigger the re-rendering of react.
      setModules([]);
      return;
    }

    Promise.all(
      bookmarked.map((courseId) =>
        fetch(
          "https://api.nusmods.com/v2/2024-2025/modules/" + courseId + ".json"
        )
          .then((res) => res.json())
          .then((data) => ({
            moduleCode: data.moduleCode,
            title: data.title,
            description: data.description,
            moduleCredit: data.moduleCredit,
            prereqTree: data.prereqTree,
          }))
      )
    ).then((mods) => setModules(mods));
  }, [userProfile?.bookmarkedCourseIds]);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, moduleCode: string, title: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      label: moduleCode,
      info: title,
      //type: 'BookmarkNode',
    }));
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these courses you bookmarked to the plan diagram.</div>
      {modules.map((m) => (
        <div className="dndnode" key={m.moduleCode} onDragStart={(event) => onDragStart(event, m.moduleCode, m.title)} draggable>
        {"⭐" + m.moduleCode}
        </div>))
      }
    </aside>
  );
};

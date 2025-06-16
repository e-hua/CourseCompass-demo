import { useDnD } from '@/components/my-hooks/UseDnDContext';
import { useUserProfile } from '@/components/my-hooks/UserProfileContext';
import {type CourseInfo } from '@/pages/BookMarkPage';
import { useEffect, useState } from 'react';

export default function PlanCourseSidebar() {

  const { userProfile } = useUserProfile();
  const [type, setType] = useDnD();

  const modules = userProfile?.bookmarkedCourseIds ?? [];
/*
  const [modules, setModules] = useState<CourseInfo[]>([]);
  
    useEffect(() => {
      const bookmarked = userProfile?.bookmarkedCourseIds ?? [];
      if (!bookmarked.length) {
        // This was to trigger the re-rendering of react.
        setModules([]);
        return;
      }},[])
  
  */   
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these courses you bookmarked to the plan diagram.</div>
      {modules.map((m) => (
        <div className="dndnode" key={m} onDragStart={(event) => onDragStart(event, 'default')} draggable>
        {m}
        </div>))
      }
    </aside>
  );
};

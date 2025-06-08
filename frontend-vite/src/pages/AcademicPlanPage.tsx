import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import Layout from "@/components/Sidebar/layout";
import "@xyflow/react/dist/style.css";
import { useState, useCallback, useEffect } from "react";
import type { NodeChange, EdgeChange, Node, Edge } from "@xyflow/react";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { Skeleton } from "@/components/ui/skeleton";
import PlanCard from "@/components/my-components/PlanCard";
import extractEdgesFromPrereqTree from "@/lib/Plan/UsePrereqTree";

export default function AcademicPlanPage() {
  const { data: courses, isLoading, error } = useTakenCourses();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []);
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []);

  useEffect(() => {
    if (!courses) return;

    const semCourseCount = new Map<number, number>();

    const computedNodes: Node[] = courses.map((course) => {
      const SEMESTER_WIDTH = 400;
      //const SEMESTER_HEIGHT = 400;//useless?
      const index = course.semesterIndex;
      const count = semCourseCount.get(index) || 0;
      semCourseCount.set(index, count + 1);

      return {
        id: course.courseCode,
        position: {
          x: 100 + count * SEMESTER_WIDTH,
          y: 100 //- (index-1) * SEMESTER_HEIGHT,
        },
        data: {
          label: <div className="text-xs text-black">{course.courseCode}</div>,
        },
        type: "default",
        draggable: true,
        parentId: `${index}`,
        extent: "parent",
        width: 200,
        height: 50,
      };
    });

    setNodes(computedNodes);

    Promise.all(
      courses.map(async (course) => {
        const res = await fetch(
          `https://api.nusmods.com/v2/2024-2025/modules/${course.courseCode}.json`
        );
        const data = await res.json();
        const prereqTree = data.prereqTree;

        if (prereqTree) {
          const prereqEdges = extractEdgesFromPrereqTree(
            prereqTree,
            course.courseCode
          ).filter(e => courses.some(code => code.courseCode === e.source));

          setEdges((prev) => [
            ...prev,
            ...prereqEdges.map((e) => ({
              id: e.source + "-" + e.target,
              source: e.source,
              target: e.target,
              animated: true,
            })),
          ]);
        }
      })
    );
  }, [courses]);

  if (isLoading) {
    return (
      <Layout>
        <div className="items-center justify-center p-8">
          <Skeleton className="m-10 p-6 mx-auto space-y-5 w-200 h-100 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-200" />
            <Skeleton className="h-4 w-100" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) return <p>Error message: {error.message}</p>;

  return (
    <Layout>
      <div className="flex-1 overflow-hidden p-8">
        <PlanCard
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
      </div>
    </Layout>
  );
}
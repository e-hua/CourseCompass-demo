import React, { useEffect } from "react";
import { isPrereqMet } from "@/lib/Plan/ExtractEdgesFromPrereqTree";
import { type Node, type Edge } from "@xyflow/react";

interface UseRestoreBookmarksProps {
  savedNodes: Node[] | null;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export default function useRestoreBookmarks(
    { savedNodes, nodes, setNodes }: UseRestoreBookmarksProps
) {

  useEffect(() => {
    if (!savedNodes) return;

    const bookmarkPositions = savedNodes.filter((n) => n.type === "BookmarkNode");

    if (bookmarkPositions.length === 0) return;

    const currentIds = new Set(nodes.map((n) => n.id));
    const bookmarksToRestore = bookmarkPositions.filter((n) => !currentIds.has(n.id));

    const restoreBookmarks = async () => {

      const newBookmarks: Node[] = await Promise.all(
        bookmarksToRestore.map(async (n) => {
          const res = await fetch(`https://api.nusmods.com/v2/2024-2025/modules/${n.id}.json`);
          const mod = await res.json();
          const prereqTree = mod.prereqTree;

          const currentCourses = new Set(nodes.filter((n) => n.type === "BookmarkNode" || n.type === "CourseNode").map((n) => n.id));
          currentCourses.add(n.id);
          const met = prereqTree ? isPrereqMet(prereqTree, currentCourses) : true;

          return {
            id: n.id,
            position: n.position,
            data: {
              label: n.id,
              title: mod.title,
              prereqTree: prereqTree,
              metPrereq: met,
            },
            type: "BookmarkNode",
            draggble: true,
            width: 200,
            height: 50,
          };
        })
      );

      setNodes((prev) => [...prev, ...newBookmarks]);
    };

    restoreBookmarks();
  }, [savedNodes]);
}

export function filterEdgesByExistingNodes(
  edges: Edge[],
  nodes: Node[]
): Edge[] {
  const nodeIds = new Set(nodes.map((n) => n.id));
  return edges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
          .map((e) => ({
            ...e,
            animated: true,
          }));
}

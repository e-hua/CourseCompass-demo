import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant, Controls, useReactFlow, Panel } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge, NodeProps } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import type { TooltipNodeProps } from "@/components/diy-ui/CourseNode";
import React, { useCallback, useEffect, useState } from "react";
import BookmarkNode from "@/components/diy-ui/BookmarkNode";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuItem
} from "@/components/ui/context-menu";
import PlanCourseSidebar from "@/components/Sidebar/plancourse-sidebar";
import extractEdgesFromPrereqTree, { isPrereqMet } from "@/lib/Plan/ExtractEdgesFromPrereqTree";
import { isEqual } from "lodash";
import { putPlan } from "@/apis/NodesandEdgesAPI";
import { toast } from "sonner";
import useRestoreBookmarks, { filterEdgesByExistingNodes } from "@/components/my-hooks/UseRestoreBookmarks";

interface PlanCardProps {
  savedNodes: Node[];
  savedEdges: Edge[];
  nodes: Node[];     
  edges: Edge[];       
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  courseNodeTypes: { CourseNode: React.MemoExoticComponent<React.FC<TooltipNodeProps>>; 
    LabeledGroupNode: React.MemoExoticComponent<React.FC<NodeProps>> };
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>; // Optional for setting nodes
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>; // Optional for setting edges
}

export default function PlanCard({ savedNodes, savedEdges, nodes, edges, onNodesChange, onEdgesChange, courseNodeTypes, setNodes, setEdges }: PlanCardProps) {

  const { screenToFlowPosition } = useReactFlow();
  const [loading, setLoading] = useState(false);
  useRestoreBookmarks({ savedNodes, nodes, setNodes });
  
  useEffect(() => {
  if (!savedEdges) return;
  setEdges((prev) => [...prev, ...filterEdgesByExistingNodes(savedEdges, nodes)]);
}, [savedEdges]);


  const nodeTypes = {
  BookmarkNode: BookmarkNode,
  ...courseNodeTypes, 
  }

  const handleSavePlan = async () => {
    setLoading(true);
    try {
      await putPlan(nodes, edges);
      toast.success("Plan saved successfully!");
    } catch (e) {
      const message = e instanceof Error ? e.message : typeof e === "string" ? e : "Unknown error";
      toast.error("Failed to save plan:", { description: message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const courseSet = new Set(
    nodes.filter((n) => n.type === "BookmarkNode" || n.type === "CourseNode").map((n) => n.id)
  );

  const updatedNodes = nodes.map((n) => {
    if (n.type !== "BookmarkNode") return n;

    const prereqTree = n.data?.prereqTree;
    const met = prereqTree ? isPrereqMet(prereqTree, courseSet) : true;
    // If no prereqTree, assume prerequisites are met

    return {
      ...n,
      data: {
        ...n.data,
        metPrereq: met,
      },
    };
  });

  if (!isEqual(nodes, updatedNodes)) {
    setNodes(updatedNodes);
  }
}, [nodes, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = 
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
 
      const raw = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (!raw) {
        return;
      }

       const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const parsed = JSON.parse(raw);
      const prereqTree = parsed.prereqTree;
      const currentCourses = new Set(nodes.filter((n) => n.type === "BookmarkNode" || n.type === "CourseNode").map((n) => n.id));
      currentCourses.add(parsed.label); // Include the one that is about to add
      const isPrereqValid = prereqTree ? isPrereqMet(prereqTree, currentCourses) : true;

      const newNode = {
        id: parsed.label, // Use the label as the node ID, aka module code
        position,
        data: { label: parsed.label, title: parsed.title, metPrereq: isPrereqValid, prereqTree: prereqTree },
        type: "BookmarkNode",
        draggble: true,
        width: 200,
        height: 50,
      };
 
      setNodes((prev) => [...prev, newNode]);

      const newEdges: Edge[] = [];

      // check edges from both directions
      if (prereqTree) {
        const prereqEdges = extractEdgesFromPrereqTree(prereqTree, parsed.label)
          .filter((e) => currentCourses.has(e.source));

        // new course depends on existing courses
        for (const e of prereqEdges) {
          newEdges.push({
            id: `${e.source}-${e.target}`,
            source: e.source,
            target: e.target,
            animated: true,
          });
        }
      }

      // existing courses depend on the new course
      for (const existing of nodes) {
        if (existing.type !== "BookmarkNode") continue;
        const existingTree = existing.data?.prereqTree;
        if (!existingTree) continue;

        const reverseEdges = extractEdgesFromPrereqTree(existingTree, existing.id)
          .filter((e) => e.source === parsed.label);

        for (const e of reverseEdges) {
          newEdges.push({
            id: `${e.source}-${e.target}`,
            source: e.source,
            target: e.target,
            animated: true,
          });
        }
      }

      // Filter out duplicates
      // Use a Set to track existing edge IDs
      const newEdgeIds = new Set(edges.map((e) => e.id));
      const filtered = newEdges.filter((e) => !newEdgeIds.has(e.id));
      setEdges((prev) => [...prev, ...filtered]);
    }
    
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
  };
 
    return (<Card className="h-full w-full rounded border">
          <ReactFlow
            nodes={nodes} nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange} 
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            fitView fitViewOptions={{ nodes: nodes, padding: 0.1 } }
          >
            <Background variant={BackgroundVariant.Dots}/>
            <Controls className="bg-white text-black border border-gray-300 shadow" position="bottom-right"/>
            <Panel position="top-right">
              <ContextMenu>
                <ContextMenuTrigger 
                className="w-30 h-20 flex justify-center items-center p-1 bg-gray-100 text-sm text-black border border-gray-300 shadow rounded cursor-pointer hover:bg-gray-200">
                Right click to use bookmark / save plan.
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <PlanCourseSidebar />
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={handleSavePlan}>
                    {loading ? "Loading..." : "Save Page..."}
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => {
                    setNodes((prev) => prev.filter((n) => n.type !== "BookmarkNode"));
                    }}>
                    Reset Plan
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </Panel>
          </ReactFlow>
        </Card> )
}

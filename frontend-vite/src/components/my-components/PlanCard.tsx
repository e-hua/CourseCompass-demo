import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant, Controls, useReactFlow, Panel } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge, NodeProps } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import type { TooltipNodeProps } from "@/components/diy-ui/CourseNode";
import React, { useCallback } from "react";
import BookmarkNode from "@/components/diy-ui/BookmarkNode";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import PlanCourseSidebar from "@/components/Sidebar/plancourse-sidebar";
import extractEdgesFromPrereqTree, { isPrereqMet } from "@/lib/Plan/ExtractEdgesFromPrereqTree";
  interface PlanCardProps {
  nodes: Node[];     
  edges: Edge[];       
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  courseNodeTypes: { CourseNode: React.MemoExoticComponent<React.FC<TooltipNodeProps>>; LabeledGroupNode: React.MemoExoticComponent<React.FC<NodeProps>> };
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>; // Optional for setting nodes
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>; // Optional for setting edges
  }

export default function PlanCard({ nodes, edges, onNodesChange, onEdgesChange, courseNodeTypes, setNodes, setEdges }: PlanCardProps) {

  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = {
  BookmarkNode: BookmarkNode,
  ...courseNodeTypes, 
  }

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
      //const courses = nodes.filter((n) => n.type === "BookmarkNode" || n.type === "CourseNode").map((n) => n.id);

      //const isPrereqValid = prereqTree ? isPrereqMet(prereqTree, new Set(courses)) : true; // If no prereq tree, assume valid

      const currentCourses = new Set(nodes.filter((n) => n.type === "BookmarkNode" || n.type === "CourseNode").map((n) => n.id));

      currentCourses.add(parsed.label); // Include the one you're about to add

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
      if (prereqTree) {
    const prereqEdges = extractEdgesFromPrereqTree(prereqTree, parsed.label)
      .filter((e) => currentCourses.has(e.source));

    for (const e of prereqEdges) {
      newEdges.push({
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        animated: true,
      });
    }
  }

  // 2. 旧课程依赖新课程
  for (const existing of nodes) {
    if (!(existing.type === "CourseNode" || existing.type === "BookmarkNode")) continue;
    const existingTree = existing.data?.prereqTree;
    if (!existingTree) continue;

    const reverseEdges = extractEdgesFromPrereqTree(existingTree, existing.id)
      .filter((e) => e.source === parsed.label); // 新加的是 prerequisite

    for (const e of reverseEdges) {
      newEdges.push({
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        animated: true,
      });
    }
  }

  // 去重（防止重复加线）
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
                className="w-24 h-24 flex justify-center items-center p-1 bg-gray-100 text-sm text-black border border-gray-300 shadow rounded cursor-pointer hover:bg-gray-200">
                Right click to view the courses you bookmarked.
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <PlanCourseSidebar />
                </ContextMenuContent>
              </ContextMenu>
            </Panel>
          </ReactFlow>
        </Card> )
}

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
  }

export default function PlanCard({ nodes, edges, onNodesChange, onEdgesChange, courseNodeTypes }: PlanCardProps) {

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
        data: { label: parsed.label, title: parsed.title, metPrereq: isPrereqValid },
        type: "BookmarkNode",
        draggble: true,
        width: 200,
        height: 50,
      };
 
       onNodesChange([{ type: 'add', item: newNode }]);

       
      if (prereqTree) {
        //const filtered = extractEdgesFromPrereqTree(prereqTree, parsed.label)
        //  .filter((e) => courses.some((code) => code === e.source));

        console.log("Dropped module:", parsed.label);
console.log("Prereq tree:", prereqTree);
        console.log("Current courses:", currentCourses);
        const filtered = extractEdgesFromPrereqTree(prereqTree, parsed.label)
          .filter((e) => currentCourses.has(e.source)); // Only include edges where the source is a current course
         console.log("Filtered edges:", filtered);
        const newEdges = filtered.map((edge) => ({
          id: `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          animated:true, //isPrereqValid, // Only animate if the prereq is met
          //style: { stroke: edge.type === "and" ? "blue" : "green" },
          //type: edge.type === "and" ? "smoothstep" : "straight",
        }));

        onEdgesChange(newEdges.map((edge) => ({ type: 'add', item: edge })));
      }
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

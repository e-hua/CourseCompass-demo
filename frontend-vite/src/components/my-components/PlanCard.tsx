import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant, Controls, useReactFlow, Panel } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge } from "@xyflow/react";
import LabeledGroupNode from "@/components/diy-ui/LabelGroupNode";
import '@xyflow/react/dist/style.css';
import type { TooltipNodeProps } from "@/components/diy-ui/CourseNode";
import React, { useCallback } from "react";
import BookmarkNode from "@/components/diy-ui/BookmarkNode";
import {
  ContextMenu,
  ContextMenuContent,
  //ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import PlanCourseSidebar from "@/components/Sidebar/plancourse-sidebar";
  interface PlanCardProps {
  nodes: Node[];     
  edges: Edge[];       
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  courseNodeTypes: { CourseNode: React.MemoExoticComponent<React.FC<TooltipNodeProps>> };
  }

export default function PlanCard({ nodes, edges, onNodesChange, onEdgesChange, courseNodeTypes }: PlanCardProps) {

  //const reactFlowWrapper = useRef(null);
  //const [type] = useDnD();
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = {
  labeledGroupNode: LabeledGroupNode,
  BookmarkNode: BookmarkNode,
  ...courseNodeTypes, 
  }

  const allNodes: Node[] = [
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
      id: `${i}`,
      position: { x: 0, y: (i-1) * 200 },
      data: { label: <div>{"Y"+Math.floor((i + 1) / 2)+"S"+(i % 2 === 0 ? 2 : 1)}</div> },
      width: 2400,
      height: 200,
      type: "labeledGroupNode",
      draggable: false,
    })),
    ...nodes
  ]

  //const[nds, setnds] = useState<Node[]>(allNodes);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
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
      const newNode = {
        id: parsed.label, // Use the label as the node ID, aka module code
        type: "BookmarkNode",
        position,
        data: { label: parsed.label, info: parsed.info },
      };
 
       onNodesChange([
      { type: 'add', item: newNode },
    ]);
  },
  [screenToFlowPosition, onNodesChange]
  );
 
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    //setType(nodeType);
    //event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
    return (<Card className="h-full w-full rounded border">
      
          <ReactFlow
            nodes={allNodes} nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange} 
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            fitView fitViewOptions={{ nodes: allNodes, padding: 0.1 } }
          >
            <Background variant={BackgroundVariant.Dots}/>
            <Controls className="bg-white text-black border border-gray-300 shadow" position="bottom-right"/>
            <Panel position="top-right"><ContextMenu>
  <ContextMenuTrigger  
  >
    Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <PlanCourseSidebar />
  </ContextMenuContent>
</ContextMenu></Panel>
          </ReactFlow>
      
        </Card> )
}

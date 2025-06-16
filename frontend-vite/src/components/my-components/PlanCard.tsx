import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant, Controls, useReactFlow } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge } from "@xyflow/react";
import LabeledGroupNode from "@/components/diy-ui/LabelGroupNode";
import '@xyflow/react/dist/style.css';
import type { TooltipNodeProps } from "@/components/diy-ui/CourseNode";
import React, { useRef, useCallback } from "react";
import { useDnD } from "@/components/my-hooks/UseDnDContext";
  interface PlanCardProps {
  nodes: Node[];     
  edges: Edge[];       
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  courseNodeTypes: { CourseNode: React.MemoExoticComponent<React.FC<TooltipNodeProps>> };
  }

export default function PlanCard({ nodes, edges, onNodesChange, onEdgesChange, courseNodeTypes }: PlanCardProps) {

  const reactFlowWrapper = useRef(null);
  const [type] = useDnD();
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = {
  labeledGroupNode: LabeledGroupNode,
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

  const[nds, setnds] = useState<Node[]>(allNodes);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!type) {
        return;
      }
 
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id:10 ,
        //getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
 
      setnds((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
    return (<Card className="h-full w-full rounded border">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nds} nodeTypes={nodeTypes}
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
          </ReactFlow>
      </div>
        </Card> )
}

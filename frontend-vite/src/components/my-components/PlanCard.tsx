import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant, Controls } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge } from "@xyflow/react";
import LabeledGroupNode from "@/components/diy-ui/LabelGroupNode";
import '@xyflow/react/dist/style.css';
interface PlanCardProps {
  nodes: Node[];     
  edges: Edge[];       
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
}

const nodeTypes = {
  labeledGroupNode: LabeledGroupNode,
};

export default function PlanCard({ nodes, edges, onNodesChange, onEdgesChange }: PlanCardProps) {

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
    return (<Card className="h-full w-full rounded border">
          <ReactFlow
            nodes={allNodes} nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange} 
            fitView fitViewOptions={{ nodes: allNodes, padding: 0.1 } }
          >
            <Background variant={BackgroundVariant.Dots}/>
            <Controls className="bg-white text-black border border-gray-300 shadow" position="bottom-right"/>
          </ReactFlow>
        </Card> )
}

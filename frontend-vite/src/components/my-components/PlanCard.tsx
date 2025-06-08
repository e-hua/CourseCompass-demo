import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge } from "@xyflow/react";
import LabeledGroupNode from "@/components/diy-ui/LabelGroupNode";
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
    ...nodes,
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
      id: `${i}`,
      position: { x: 0, y: (i-1) * 400 },
      data: { label: <div>{"Y"+Math.floor((i + 1) / 2)+"S"+(i % 2 === 0 ? 2 : 1)}</div> },
      width: 2400,
      height: 300,
      type: "labeledGroupNode",
      draggable: false,
    })),
]
    return (<Card className="h-full w-full rounded border">
          <ReactFlow
            nodes={allNodes} nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange} fitView
            fitViewOptions={{ padding: 0.1 }}
          >
            <Background variant={BackgroundVariant.Dots}/>
          </ReactFlow>
        </Card> )
}

import { Card } from "@/components/ui/card";
import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";
import type { NodeChange, EdgeChange, Node, Edge } from "@xyflow/react";

interface PlanCardProps {
  nodes: Node[];     
  edges: Edge[];       
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
}
export default function PlanCard({ nodes, edges, onNodesChange, onEdgesChange }: PlanCardProps) {
    return (<Card className="h-full w-full rounded border">
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
          >
            <Background variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </Card> )
}

import { ReactFlow, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import Layout from '@/components/Sidebar/layout';
import '@xyflow/react/dist/style.css';
import { Card } from '@/components/ui/card';
import { useState, useCallback } from 'react';
import type { NodeChange, EdgeChange, Node, Edge } from '@xyflow/react';

const initialNodes: Node[] = [
  { id: '1', position: { x: 500, y: 200 }, data: { label: <div className="text-xs text-black">CS1101S</div> }},
  { id: '2', position: { x: 500, y: 500 }, data: { label: <div className="text-xs text-black">CS2040S</div> }},
  { id: '3', position: { x: 800, y: 200 }, data: { label: <div className="text-xs text-black">CS2100</div> }},
  { id: '4', position: { x: 800, y: 500 }, data: { label: <div className="text-xs text-black">CS1231S</div> }},
  { id: '5', position: { x: 1100, y: 200 }, data: { label: <div className="text-xs text-black">CS2030S</div> }},
  { id: '6', position: { x: 1100, y: 500 }, data: { label: <div className="text-xs text-black">MA1522</div> }},
];
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e4-2', source: '4', target: '2' },
  { id: 'e1-5', source: '1', target: '5' },
];


export default function AcademicPlanPage() {

const [nodes, setNodes] = useState(initialNodes);
const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
  (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
  [],
);
const onEdgesChange = useCallback(
  (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  [],
);

  return (
    <Layout>
    <div className="flex-1 overflow-hidden p-8">
      <Card className="h-full w-full rounded border bg-white shadow-sm dark:bg-gray-800">
      <ReactFlow nodes={nodes} onNodesChange = {onNodesChange} edges={edges} onEdgesChange ={onEdgesChange}/>
    </Card>
    </div>
    </Layout>
  );
}

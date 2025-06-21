import { memo } from "react";
import { type NodeProps, Position, Handle } from "@xyflow/react";
import { TooltipNode, TooltipContent, TooltipTrigger } from "@/components/tooltip-node";
import { Link } from "react-router-dom";
import { NodeStatusIndicator } from "@/components/node-status-indicator";

type CourseNodeData = {
  label: string;
  title: string;
  metPrereq: boolean;
  prereqTree?: string | { and?: CourseNodeData[]; or?: CourseNodeData[] };
}
export interface TooltipNodeProps extends NodeProps {
  data: CourseNodeData;
}

const CourseNode = memo(({ selected, data }: TooltipNodeProps) => {
  return (
    <TooltipNode selected={selected}>
      <TooltipContent position={Position.Top} style={{width: "150px", height: "50px"}}>
        <div className="text-sm" style={{color: "var(--vite-purple)"}}>
          <p>{"Title: " + data.title}</p>
        </div>
      </TooltipContent>
      <Handle type="target" position={Position.Top} />
      <Link to={"/courses/" + data.label} className="no-underline">
        <NodeStatusIndicator status={ data.metPrereq ? "loading" : "error"}>
        <TooltipTrigger style={{width: "200px", height: "50px"}} className="flex text-xl text-center font-bold">
          {data.label}
        </TooltipTrigger>
        </NodeStatusIndicator>
      </Link>
      <Handle type="source" position={Position.Bottom}/>
    </TooltipNode>
  );
});

export default CourseNode;

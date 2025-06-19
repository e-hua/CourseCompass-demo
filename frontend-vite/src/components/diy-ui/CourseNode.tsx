import { memo } from "react";
import { type NodeProps, Position, Handle } from "@xyflow/react";
import { TooltipNode, TooltipContent, TooltipTrigger } from "@/components/tooltip-node";
import { Link } from "react-router-dom";

type CourseNodeData = {
  label: string;
  units: number;
  grade: string;
}
export interface TooltipNodeProps extends NodeProps {
  data: CourseNodeData;
}

const CourseNode = memo(({ selected, data }: TooltipNodeProps) => {
  return (
    <TooltipNode selected={selected}>
      <TooltipContent position={Position.Top} style={{width: "150px", height: "50px"}}>
        <div className="text-sm" style={{color: "var(--vite-purple)"}}>
        <p>{"Credits: " + data.units}</p>
        <p>{"Grade: " + data.grade}</p>
        </div>
      </TooltipContent>

      <Handle type="target" position={Position.Top} />
      <Link to={"/courses/" + data.label} className="no-underline">
      <TooltipTrigger style={{width: "200px", height: "50px"}} className="flex text-xl text-center font-bold">
        {data.label}
      </TooltipTrigger>
      </Link>
      <Handle type="source" position={Position.Bottom}/>
    </TooltipNode>
  );
});

export default CourseNode;

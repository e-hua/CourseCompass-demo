import { memo } from "react";
import { type NodeProps, Position, Handle } from "@xyflow/react";
import { TooltipNode, TooltipContent, TooltipTrigger } from "@/components/tooltip-node";

type CourseNodeData = {
  label: string;
  info: string;
}
export interface TooltipNodeProps extends NodeProps {
  data: CourseNodeData;
}

const CourseNode = memo(({ selected, data }: TooltipNodeProps) => {
  return (
    <TooltipNode selected={selected}>
      <TooltipContent position={Position.Top} style={{width: "150px", height: "50px"}}>
        <div className="text-sm" style={{color: "var(--vite-purple)"}}>
          {"Credits: " + data.info.charAt(0) + "\n" + "Grade: " + data.info.substring(1)}
          </div>
      </TooltipContent>

      <Handle type="target" position={Position.Top} />
      <TooltipTrigger style={{width: "200px", height: "50px"}} className="flex text-xl text-center font-bold">
        {data.label}
      </TooltipTrigger>
      <Handle type="source" position={Position.Bottom}/>
    </TooltipNode>
  );
});

export default CourseNode;

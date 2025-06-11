import { memo } from "react";
import { type NodeProps, Position, Handle } from "@xyflow/react";
import {
  TooltipNode,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tooltip-node";

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
      <TooltipContent position={Position.Top}>
        <div className="text-white text-sm">{data.info}</div>
      </TooltipContent>

      {/* Handles */}
      <Handle type="target" position={Position.Top} />
      <TooltipTrigger>
        <div
          className="bg-white text-black text-center rounded-md p-2 shadow border"
          style={{
            minWidth: "100px",
            borderColor: "var(--vite-purple)",
          }}
        >
          {data.label}
        </div>
      </TooltipTrigger>
      <Handle type="source" position={Position.Bottom} />
    </TooltipNode>
  );
});

export default CourseNode;

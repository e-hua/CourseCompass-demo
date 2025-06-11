import { memo } from "react";
import { GroupNode } from "@/components/labeled-group-node";
import type { NodeProps } from "@xyflow/react";

const LabeledGroupNode = memo(({ data }: NodeProps) => {
  return <GroupNode label={data.label as React.ReactNode}/>;
});
 
export default LabeledGroupNode;
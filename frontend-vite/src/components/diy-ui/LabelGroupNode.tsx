import { memo } from "react";
import { GroupNode } from "@/components/labeled-group-node";
import type { NodeProps } from "@xyflow/react";

const LabeledGroupNode = memo(({ selected }: NodeProps) => {
  return <GroupNode selected={selected} label="Label" />;
});
 
export default LabeledGroupNode;
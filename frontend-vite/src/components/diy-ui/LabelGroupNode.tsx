import { memo } from "react";
import { GroupNode } from "@/components/labeled-group-node";
import type { NodeProps } from "@xyflow/react";

const LabeledGroupNode = memo(({ //selected, 
  data }: NodeProps) => {
  return <GroupNode //selected={selected} 
  label={data.label as React.ReactNode}/>;
});
 
export default LabeledGroupNode;
type PrereqTree = string | { and?: PrereqTree[]; or?: PrereqTree[] };

export default function extractEdgesFromPrereqTree(prereqTree: PrereqTree, target: string)
: { source: string; target: string }[] {
  if (typeof prereqTree === "string") {
    return [{ source: prereqTree.split(":")[0], target }];
  }

  const edges: { source: string; target: string }[] = [];

  if (prereqTree.and) {
    for (const child of prereqTree.and) {
      edges.push(...extractEdgesFromPrereqTree(child, target));
    }
  } else if (prereqTree.or) {
    for (const child of prereqTree.or) {
      edges.push(...extractEdgesFromPrereqTree(child, target));
    }
  }

  return edges;
}
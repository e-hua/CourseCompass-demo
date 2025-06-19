type PrereqTree = string | { and?: PrereqTree[]; or?: PrereqTree[] };
type PrereqEdge = {
  source: string;
  target: string;
  type: "and" | "or" | "single";
};

export default function extractEdgesFromPrereqTree(
  prereqTree: PrereqTree, target: string, relation: "and" | "or" | "single" = "single")
: PrereqEdge[] {
  if (typeof prereqTree === "string") {
    return [{ source: prereqTree.split(":")[0], target, type: relation }];
  }

  const edges: PrereqEdge[] = [];

  if (prereqTree.and) {
    for (const child of prereqTree.and) {
      edges.push(...extractEdgesFromPrereqTree(child, target, "and"));
    }
  } else if (prereqTree.or) {
    for (const child of prereqTree.or) {
      edges.push(...extractEdgesFromPrereqTree(child, target, "or"));
    }
  }

  return edges;
}

export function isPrereqMet(tree: PrereqTree, taken: Set<string>): boolean {
  if (typeof tree === "string") {
    return taken.has(tree.split(":")[0]);
  }

  if (tree.and) {
    return tree.and.every((child) => isPrereqMet(child, taken));
  }

  if (tree.or) {
    return tree.or.some((child) => isPrereqMet(child, taken));
  }

  return true;
}

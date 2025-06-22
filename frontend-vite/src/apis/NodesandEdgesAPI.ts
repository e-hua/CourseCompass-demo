import { API_URL } from "@/constants/API";
import type { Node, Edge } from "@xyflow/react";

type PrereqTree = string | { and?: PrereqTree[]; or?: PrereqTree[] };

export interface NodeData {
  label: string;
  units?: number;
  grade?: string;
  title?: string;
  metPrereq?: boolean;
  prereqTree?: PrereqTree;
}

export interface NodeProps {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
  type: string;
  draggable: boolean;
  parentId?: string;
  extent?: "parent";
  width: number;
  height: number;
}

export interface EdgeProps {
  source: string;
  target: string;
  id: string;
  animated: boolean;
}

export async function postPlan(nodes: Node[], edges: Edge[]): Promise<void> {
  
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const payload = {
    nodes: nodes.map((node) => ({
      id: node.id,
      position: node.position,
      data: node.data,
      type: node.type,
      draggable: node.draggable,
      parentId: node.parentId,
      extent: node.extent,
      width: node.width,
      height: node.height,
    })),
    edges: edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      id: edge.id,
      animated: edge.animated,
    })),
  }

  const res = await fetch(API_URL + "save-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to save your plan");
}

export async function fetchPlan(): Promise<{ nodes: Node[]; edges: Edge[] }> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "get-plan", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch nodes and edges");

  return res.json();
}

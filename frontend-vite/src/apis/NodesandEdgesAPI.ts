import { API_URL } from "@/constants/API";
import type { Node, Edge } from "@xyflow/react";

export interface NodeProps {
  id: string;
  position: { x: number; y: number };
  type: string;
}

export interface EdgeProps {
  source: string;
  target: string;
  id: string;
}

export async function putPlan(nodes: Node[], edges: Edge[]): Promise<void> {
  
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "plan/set-plan", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nodes: nodes.map((node) => ({
        id: node.id,
        position: node.position,
        type: node.type,
      })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        id: edge.id,
      })),
    }),
  });

  if (!res.ok) throw new Error("Failed to save your plan");
}

export async function fetchPlan(): Promise<{ nodes: Node[]; edges: Edge[] }> {
  const token = localStorage.getItem("id_token");
  if (!token) throw new Error("Missing ID token");

  const res = await fetch(API_URL + "plan/get-plan", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch nodes and edges");

  const resJson = await res.json();
  return { nodes: resJson.nodes ?? [], edges: resJson.edges ?? []};
}

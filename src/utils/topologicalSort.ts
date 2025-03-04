import type { ActionBlueprintNode } from "../schema";

export function topologicalSort(
  nodes: Record<string, ActionBlueprintNode>,
  startNodeIds: string[],
): ActionBlueprintNode[] {
  const allIds = new Set<string>();
  const stack: string[] = [...startNodeIds];

  while (stack.length > 0) {
    const id = stack.pop();
    if (!id || allIds.has(id)) continue;
    allIds.add(id);
    const node = nodes[id];
    if (node && node.data.prerequisites.length > 0) {
      stack.push(...node.data.prerequisites);
    }
  }

  const indegree: Record<string, number> = {};
  const adjList: Record<string, string[]> = {};

  for (const id of allIds) {
    indegree[id] = 0;
    adjList[id] = [];
  }

  for (const id of allIds) {
    const node = nodes[id];
    if (node) {
      for (let i = 0, len = node.data.prerequisites.length; i < len; i++) {
        const prereqId = node.data.prerequisites[i];
        if (allIds.has(prereqId)) {
          adjList[prereqId].push(id);
          indegree[id]++;
        }
      }
    }
  }
  const sortedIds: string[] = [];
  const queue: string[] = [];

  for (const id in indegree) {
    if (indegree[id] === 0) {
      queue.push(id);
    }
  }

  let qi = 0;
  while (qi < queue.length) {
    const currentId = queue[qi++];
    sortedIds.push(currentId);
    const neighbors = adjList[currentId];
    for (let i = 0, len = neighbors.length; i < len; i++) {
      const neighbor = neighbors[i];
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return sortedIds.map(id => nodes[id]).filter(Boolean);
}

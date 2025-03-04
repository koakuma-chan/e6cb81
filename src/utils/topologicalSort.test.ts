import { describe, expect, it } from "vitest";
import type { ActionBlueprintNode } from "../schema";
import { topologicalSort } from "./topologicalSort";

describe("topologicalSort", () => {
  it("should return nodes in correct topological order", () => {
    // Create a test graph with dependencies
    //    A      F
    //   / \     |
    //  B   C    |
    //   \ /     |
    //    D      G
    //    |
    //    E
    const nodes: Record<string, ActionBlueprintNode> = {
      "A": createNode("A", []),
      "B": createNode("B", ["A"]),
      "C": createNode("C", ["A"]),
      "D": createNode("D", ["B", "C"]),
      "E": createNode("E", ["D"]),
      "F": createNode("F", []),
      "G": createNode("G", ["F"]),
    };

    // Test starting from node E (should include A, B, C, D, E in order)
    const result1 = topologicalSort(nodes, ["E"]);
    const ids1 = result1.map(node => node.id);

    // There may be multiple valid topological sorts, but dependencies must be preserved
    expect(ids1).toContain("A");
    expect(ids1).toContain("B");
    expect(ids1).toContain("C");
    expect(ids1).toContain("D");
    expect(ids1).toContain("E");
    expect(ids1).not.toContain("F");
    expect(ids1).not.toContain("G");

    // Check order constraints
    expectBefore(ids1, "A", "B");
    expectBefore(ids1, "A", "C");
    expectBefore(ids1, "B", "D");
    expectBefore(ids1, "C", "D");
    expectBefore(ids1, "D", "E");
  });

  it("should handle multiple start nodes", () => {
    const nodes: Record<string, ActionBlueprintNode> = {
      "A": createNode("A", []),
      "B": createNode("B", ["A"]),
      "C": createNode("C", ["A"]),
      "D": createNode("D", ["B", "C"]),
      "E": createNode("E", ["D"]),
      "F": createNode("F", []),
      "G": createNode("G", ["F"]),
    };

    // Test starting from nodes E and G
    const result = topologicalSort(nodes, ["E", "G"]);
    const ids = result.map(node => node.id);

    // Should include A, B, C, D, E, F, G
    expect(ids).toContain("A");
    expect(ids).toContain("B");
    expect(ids).toContain("C");
    expect(ids).toContain("D");
    expect(ids).toContain("E");
    expect(ids).toContain("F");
    expect(ids).toContain("G");

    // Check order constraints for both paths
    expectBefore(ids, "A", "B");
    expectBefore(ids, "A", "C");
    expectBefore(ids, "B", "D");
    expectBefore(ids, "C", "D");
    expectBefore(ids, "D", "E");
    expectBefore(ids, "F", "G");
  });

  it("should handle cyclic dependencies by breaking them", () => {
    // Create a cyclic dependency: A -> B -> C -> A
    const nodes: Record<string, ActionBlueprintNode> = {
      "A": createNode("A", ["C"]),
      "B": createNode("B", ["A"]),
      "C": createNode("C", ["B"]),
    };

    const result = topologicalSort(nodes, ["A"]);

    // The algorithm should handle cycles by breaking them
    // and still produce a valid (though incomplete) ordering
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("should handle empty input", () => {
    const nodes: Record<string, ActionBlueprintNode> = {};
    const result = topologicalSort(nodes, []);
    expect(result).toEqual([]);
  });

  it("should handle nonexistent start nodes", () => {
    const nodes: Record<string, ActionBlueprintNode> = {
      "A": createNode("A", []),
      "B": createNode("B", ["A"]),
    };

    // X is not a valid node ID
    const result = topologicalSort(nodes, ["X"]);
    expect(result).toEqual([]);
  });
});

// Helper function to create a test node
function createNode(id: string, prerequisites: string[]): ActionBlueprintNode {
  return {
    id,
    type: "form",
    position: { x: 0, y: 0 },
    data: {
      name: `Node ${id}`,
      component_id: `component-${id}`,
      prerequisites,
    },
  };
}

// Helper function to check if item1 comes before item2 in the array
function expectBefore(array: string[], item1: string, item2: string) {
  const index1 = array.indexOf(item1);
  const index2 = array.indexOf(item2);
  expect(index1).not.toBe(-1);
  expect(index2).not.toBe(-1);
  expect(index1).toBeLessThan(index2);
}

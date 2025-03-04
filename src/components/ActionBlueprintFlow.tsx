import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useState } from "react";
import "@xyflow/react/dist/style.css";
import type { ActionBlueprint, ActionBlueprintNode } from "../schema";
import ActionBlueprintFlowContext from "./ActionBlueprintFlowContext";
import ActionBlueprintFlowNode from "./ActionBlueprintFlowNode";
import ActionBlueprintFlowPrefillDialog from "./ActionBlueprintFlowPrefillDialog";

type Props = {
  actionBlueprint: ActionBlueprint;
};

export default function ActionBlueprintFlow(props: Props) {
  const { actionBlueprint } = props;

  const [clickedNodeData, setClickedNodeData] = useState<ActionBlueprintNode["data"] | undefined>();

  const edges = actionBlueprint.edges.map(edge => {
    return {
      ...edge,

      id: `${edge.source}-${edge.target}`,
    };
  });

  return (
    <div className="h-screen">
      <ActionBlueprintFlowContext.Provider
        value={{
          actionBlueprint,
          clickedNodeData,
          setClickedNodeData,
        }}
      >
        <ReactFlow
          // @ts-ignore
          nodeTypes={{ form: ActionBlueprintFlowNode }}
          defaultNodes={actionBlueprint.nodes}
          defaultEdges={edges}
        >
          <Background />

          <Controls />
        </ReactFlow>

        {clickedNodeData && <ActionBlueprintFlowPrefillDialog />}
      </ActionBlueprintFlowContext.Provider>
    </div>
  );
}

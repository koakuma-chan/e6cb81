import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ActionBlueprint, ActionBlueprintNode } from "../schema";

type ActionBlueprintFlowContext = {
  actionBlueprint: ActionBlueprint;
  clickedNodeData: ActionBlueprintNode["data"] | undefined;
  setClickedNodeData: Dispatch<SetStateAction<ActionBlueprintNode["data"] | undefined>>;
};

const ActionBlueprintFlowContext = createContext<ActionBlueprintFlowContext | undefined>(undefined);

export default ActionBlueprintFlowContext;

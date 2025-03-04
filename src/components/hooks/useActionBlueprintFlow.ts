import { useContext } from "react";
import ActionBlueprintContextFlow from "../ActionBlueprintFlowContext";

export default function useActionBlueprintFlow() {
  return useContext(ActionBlueprintContextFlow)!;
}

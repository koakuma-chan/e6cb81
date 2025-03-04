import { Handle, Position, useEdges } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { ActionBlueprintNode } from "../schema";
import useActionBlueprintFlow from "./hooks/useActionBlueprintFlow";

export default function ActionBlueprintFormNode(props: NodeProps<ActionBlueprintNode>) {
  const { actionBlueprint, setClickedNodeData } = useActionBlueprintFlow();

  const edges = useEdges();

  return (
    <div
      className="w-60 p-2 border border-gray-400 rounded-xl flex gap-2 items-center cursor-pointer transition hover:border-gray-500"
      onClick={() => setClickedNodeData(props.data)}
    >
      <div className="w-12 h-12 bg-indigo-400 rounded-xl">
      </div>

      {edges.some(edge => edge.target === props.id) && <Handle type="target" position={Position.Left} />}

      <div>
        <div className="text-sm line-clamp-1 break-all text-gray-600">
          {actionBlueprint.name}
        </div>

        <div className="text-lg line-clamp-1 break-all text-gray-800">
          {props.data.name}
        </div>
      </div>

      {edges.some(edge => edge.source === props.id) && <Handle type="source" position={Position.Right} />}
    </div>
  );
}

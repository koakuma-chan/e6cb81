import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import getGlobalData from "../getGlobalData";
import type { ActionBlueprintFormUiSchemaElement } from "../schema";
import { topologicalSort } from "../utils/topologicalSort";
import ActionBlueprintFlowPrefillDataSource from "./ActionBlueprintFlowPrefillDataSource";
import type ActionBlueprintFlowPrefillSelection from "./ActionBlueprintFlowPrefillSelection";
import useActionBlueprintFlow from "./hooks/useActionBlueprintFlow";

type Props = {
  element: ActionBlueprintFormUiSchemaElement | undefined;
  onClose: () => void;
  onSelect: (selection: ActionBlueprintFlowPrefillSelection) => void;
};

export default function ActionBlueprintFlowPrefillDataElementSelectionDialog(props: Props) {
  const {
    element,
    onClose,
    onSelect,
  } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (element) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [element]);

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const {
    actionBlueprint,
    clickedNodeData,
  } = useActionBlueprintFlow();

  const [selection, setSelection] = useState<ActionBlueprintFlowPrefillSelection | undefined>();

  const data = useMemo(() => {
    if (!clickedNodeData) return undefined;
    const data = getGlobalData();
    const nodes = Object.fromEntries(actionBlueprint.nodes.map(node => [node.id, node]));
    const forms = Object.fromEntries(actionBlueprint.forms.map(form => [form.id, form]));
    const dependencies = topologicalSort(nodes, clickedNodeData.prerequisites);
    for (const node of dependencies) {
      const form = forms[node.data.component_id];
      if (form) {
        data.push({
          label: node.data.name,
          values: form.ui_schema.elements.map(element => element.label),
        });
      }
    }
    return data;
  }, [clickedNodeData]);

  return (
    <dialog
      className="m-auto rounded-xl w-lg h-128 p-8 flex flex-col gap-4 backdrop:hidden"
      ref={dialogRef}
      onClick={handleBackdropClick}
    >
      <div className="text-gray-800 text-lg font-semibold">
        Select data element to map
      </div>

      <ol className="grid gap-2 text-sm max-h-96 overflow-y-scroll">
        {data?.map(({ label, values }, index) => (
          <li key={index}>
            <ActionBlueprintFlowPrefillDataSource
              label={label}
              values={values}
              selection={selection}
              setSelection={setSelection}
            />
          </li>
        ))}
      </ol>

      <div className="mt-auto space-x-2 flex justify-end">
        <button
          className="bg-gray-200 cursor-pointer transition hover:bg-gray-300 rounded-xl py-2 px-3"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`bg-gray-200 transition rounded-xl py-2 px-3 ${
            selection ? "cursor-pointer hover:bg-gray-300" : "opacity-60"
          }`}
          onClick={() => selection && onSelect(selection)}
          disabled={!selection}
        >
          Select
        </button>
      </div>
    </dialog>
  );
}

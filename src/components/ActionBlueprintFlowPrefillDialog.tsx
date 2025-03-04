import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { ActionBlueprintFormUiSchemaElement } from "../schema";
import ActionBlueprintFlowPrefillDataElementSelectionDialog from "./ActionBlueprintFlowPrefillDataElementSelectionDialog";
import useActionBlueprintFlow from "./hooks/useActionBlueprintFlow";

export default function ActionBlueprintFlowPrefillDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    actionBlueprint,
    clickedNodeData,
    setClickedNodeData,
  } = useActionBlueprintFlow();

  useEffect(() => {
    if (dialogRef.current) {
      if (clickedNodeData) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [clickedNodeData]);

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      setClickedNodeData(undefined);
    }
  };

  const form = useMemo(() => {
    if (clickedNodeData) {
      return actionBlueprint.forms.find(form => form.id === clickedNodeData.component_id);
    }
  }, [clickedNodeData]);
  const [mappings, setMappings] = useState(new Map());

  const [clickedElement, setClickedElement] = useState<ActionBlueprintFormUiSchemaElement | undefined>();

  return (
    <dialog
      className="m-auto rounded-xl w-lg h-128"
      ref={dialogRef}
      onClick={handleBackdropClick}
    >
      <div className="p-8 space-y-4 text-gray-800">
        <div>
          <div className="text-lg font-semibold">
            Prefill
          </div>

          <div className="text-sm text-gray-600">
            Prefills fields for this form
          </div>
        </div>

        <ol className="grid gap-2 text-sm">
          {form?.ui_schema.elements.map((element, index) => {
            const mapping = mappings.get(element);
            return (
              <li
                key={index}
                className={`flex py-2 px-3 bg-gray-100 rounded-xl border border-gray-300 cursor-pointer transition hover:border-gray-500 ${
                  mapping ? "" : "opacity-60"
                }`.trim()}
                onClick={() => setClickedElement(element)}
              >
                {mapping
                  ? (
                    <>
                      <div className="line-clamp-1 break-all">
                        {`${element.label}: ${mapping.label}.${mapping.value}`}
                      </div>
                      <button
                        className="ml-auto bg-gray-300 rounded-full p-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMappings(mappings => {
                            mappings.delete(element);
                            return new Map(mappings);
                          });
                        }}
                      >
                        <svg className="size-3" viewBox="0 -960 960 960">
                          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                      </button>
                    </>
                  )
                  : (
                    <div className="line-clamp-1 break-all">
                      {element.label}
                    </div>
                  )}
              </li>
            );
          })}
        </ol>
      </div>

      {clickedElement && (
        <ActionBlueprintFlowPrefillDataElementSelectionDialog
          element={clickedElement}
          onClose={() => setClickedElement(undefined)}
          onSelect={(selection) => {
            setMappings(mappings => {
              mappings.set(clickedElement, selection);
              return new Map(mappings);
            });
            setClickedElement(undefined);
          }}
        />
      )}
    </dialog>
  );
}

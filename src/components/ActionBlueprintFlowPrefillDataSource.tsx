import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type ActionBlueprintFlowPrefillSelection from "./ActionBlueprintFlowPrefillSelection";

type Props = {
  label: string;
  values: string[];
  selection: ActionBlueprintFlowPrefillSelection | undefined;
  setSelection: Dispatch<SetStateAction<ActionBlueprintFlowPrefillSelection | undefined>>;
};

export default function ActionBlueprintFlowPrefillDataSource(props: Props) {
  const {
    label,
    values,
    selection,
    setSelection,
  } = props;

  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full rounded-xl px-3 py-2 transition border border-gray-300 bg-gray-100 hover:border-gray-500 focus:outline-none flex items-center gap-2 cursor-pointer"
      >
        <svg
          className={`w-5 h-5 transition ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        {label}
      </button>

      {open && (
        <ol className="px-4 py-2 grid gap-2">
          {values.map((value, index) => {
            const id = `${label}-${index}`;
            return (
              <li
                key={index}
                className={`bg-gray-100 rounded-xl py-2 px-3 transition border cursor-pointer ${
                  selection?.id === id
                    ? "border-blue-500"
                    : "border-gray-300 hover:border-gray-500"
                }`}
                onClick={() => setSelection({ id, label, value })}
              >
                {value}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

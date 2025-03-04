import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ActionBlueprintSchema } from "../schema";
import type { ActionBlueprint } from "../schema";
import ActionBlueprintFlow from "./ActionBlueprintFlow";

export default function ActionBlueprint() {
  const params = useParams();

  const [actionBlueprint, setActionBlueprint] = useState<ActionBlueprint | "loading" | "error">("loading");

  useEffect(() => {
    const abortController = new AbortController();
    const url = import.meta.env.VITE_API_SERVER_URL;
    const pathname = `/api/v1/${params.tenantId}/actions/blueprints/${params.actionBlueprintId}/graph`;
    fetch(`${url}/${pathname}`, { signal: abortController.signal })
      .then(response => response.json())
      .then(response => ActionBlueprintSchema.parse(response))
      .then(response => setActionBlueprint(response))
      .catch(e => {
        console.error(`failed to fetch data: ${e}`);

        setActionBlueprint("error");
      });
    return () => {
      abortController.abort();
    };
  }, []);

  let result;

  switch (actionBlueprint) {
    case "loading":
      result = <>Loading...</>;

      break;

    case "error":
      result = <>Error :(</>;

      break;

    default:
      result = <ActionBlueprintFlow actionBlueprint={actionBlueprint} />;

      break;
  }

  return result;
}

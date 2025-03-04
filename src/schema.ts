import { z } from "zod";

export const GlobalDataSchema = z.object({
  label: z.string(),
  values: z.string().array(),
}).array();

export const ActionBlueprintNodeSchema = z.object({
  id: z.string(),
  type: z.enum(["form", "branch", "trigger", "configuration"]),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.object({
    name: z.string(),
    component_id: z.string(),
    prerequisites: z.string().array(),
  }),
});

export type ActionBlueprintNode = z.infer<typeof ActionBlueprintNodeSchema>;

export const ActionBlueprintFormUiSchemaElementSchema = z.object({
  type: z.enum(["Control", "Button"]),
  scope: z.string(),
  label: z.string(),
});

export type ActionBlueprintFormUiSchemaElement = z.infer<typeof ActionBlueprintFormUiSchemaElementSchema>;

export const ActionBlueprintFormSchema = z.object({
  id: z.string(),
  ui_schema: z.object({
    elements: ActionBlueprintFormUiSchemaElementSchema.array(),
  }),
});

export type ActionBlueprintForm = z.infer<typeof ActionBlueprintFormSchema>;

export const ActionBlueprintSchema = z.object({
  name: z.string(),
  nodes: ActionBlueprintNodeSchema.array(),
  edges: z.object({
    source: z.string(),
    target: z.string(),
  }).array(),
  forms: ActionBlueprintFormSchema.array(),
});

export type ActionBlueprint = z.infer<typeof ActionBlueprintSchema>;

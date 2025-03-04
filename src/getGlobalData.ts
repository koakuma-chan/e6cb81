import globalData from "./globalData.json";
import { GlobalDataSchema } from "./schema";

export default function getGlobalData() {
  return GlobalDataSchema.parse(globalData);
}

import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ActionBlueprint from "./components/ActionBlueprint";

const root = createRoot(document.getElementById("app")!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/:tenantId/actions/blueprints/:actionBlueprintId/graph" element={<ActionBlueprint />} />
    </Routes>
  </BrowserRouter>,
);

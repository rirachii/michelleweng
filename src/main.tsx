import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Portfolio } from "./portfolio";
import "./portfolio.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Portfolio />
  </StrictMode>
);

// Production ships the complete portfolio HTML; development starts with an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

// Use the existing Vite transformer instead of adding a second build tool.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { Portfolio } = await server.ssrLoadModule("/src/portfolio.tsx");
  const html = await readFile("dist/index.html", "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker))
    throw new Error("Portfolio root missing from build output");
  await writeFile(
    "dist/index.html",
    html.replace(
      marker,
      `<div id="root">${renderToString(createElement(Portfolio))}</div>`,
    ),
  );
  console.log("Prerendered portfolio HTML. BapOS remains a separate entry.");
} finally {
  await server.close();
}

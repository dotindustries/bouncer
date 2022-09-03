import { writeFileSync } from "fs";
import path, { join, posix } from "path";
import { fileURLToPath } from "url";

import { entryPoints } from "./entry-points.mjs";
import packageJson from "../package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distRoot = `${__dirname}/../dist`;
const _name = packageJson.name;

entryPoints.forEach((dirs) => {
  if (!dirs.length) return;
  writeFileSync(
    join(distRoot, ...dirs, "package.json"),
    JSON.stringify(
      {
        name: posix.join(_name, ...dirs),
        main: `index.cjs.js`,
        module: "index.js",
        types: "index.d.ts",
      },
      null,
      2
    ) + "\n"
  );
});

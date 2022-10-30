import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

let __dirname = dirname(fileURLToPath(import.meta.url));
let file = resolve(__dirname, "../dist/cli.js");

writeFileSync(
  file,
  "#!/usr/bin/env node\n" + readFileSync(file, "utf-8"),
  "utf-8"
);

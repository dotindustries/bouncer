import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import packageJson from "../package.json" assert { type: "json" };

packageJson.private = false;
delete packageJson.scripts;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPackageJson =
  JSON.stringify(
    packageJson,
    (_, value) => {
      if (typeof value === "string" && value.startsWith("dist/")) {
        return value.split("/").slice(1).join("/");
      }
      return value;
    },
    2
  ) + "\n";

const distRoot = `${__dirname}/../dist`;
fs.writeFileSync(`${distRoot}/package.json`, distPackageJson);

const srcDir = `${__dirname}/..`;
fs.copyFileSync(`${srcDir}/README.md`, `${distRoot}/README.md`);
fs.copyFileSync(`${srcDir}/LICENSE`, `${distRoot}/LICENSE`);

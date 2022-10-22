import { join } from "path";

export const entryPoints = [[], ["common"], ["db"]];

export const entryPointPaths = entryPoints.map((entryPoint) =>
  join(...entryPoint)
);

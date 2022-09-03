import { join } from "path";

export const entryPoints = [[], ["core"], ["db"], ["trpc"], ["utils"]];

export const entryPointPaths = entryPoints.map((entryPoint) =>
  join(...entryPoint)
);

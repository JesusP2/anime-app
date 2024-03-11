import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components", "src/utils.ts"],
  format: "esm",
  splitting: true,
  sourcemap: true,
  clean: true,
  target: "es6",
  outDir: "dist",
  dts: true,
});

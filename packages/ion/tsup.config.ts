import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  format: "esm",
  splitting: true,
  sourcemap: true,
  clean: true,
  target: "es6",
  outDir: "dist",
  dts: true,
});

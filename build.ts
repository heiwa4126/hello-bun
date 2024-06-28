import { build } from "bun";
import dts from "bun-plugin-dts";

async function buildProject() {
  // ESM build
  await build({
    entrypoints: ["./src/index.ts", "./src/cli.ts"],
    outdir: "./dist/esm",
    format: "esm",
    target: "node",
    minify: true,
    splitting: true,
    external: ["./node_modules"],
    plugins: [dts()],
  });

  // // CJS build
  // await build({
  //   entrypoints: ["./src/index.ts"],
  //   outdir: "./dist/cjs",
  //   format: "cjs",
  //   target: "node",
  //   minify: true,
  // });

  console.log("Build completed successfully!");
}

buildProject().catch(console.error);

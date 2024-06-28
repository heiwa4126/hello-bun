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

	// // CJS build with TypeScript compiler
	// exec("tsc --project tsconfig.cjs.json", (error, stdout, stderr) => {
	//   if (error) {
	//     console.error(`Error: ${error.message}`);
	//     return;
	//   }
	//   if (stderr) {
	//     console.error(`Stderr: ${stderr}`);
	//     return;
	//   }
	//   console.log(`Stdout: ${stdout}`);
	// });

	console.log("Build completed successfully!");
}

buildProject().catch(console.error);

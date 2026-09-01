import { build } from "bun";

async function buildProject() {
	// ESM build
	const result = await build({
		entrypoints: ["./src/index.ts", "./src/cli.ts"],
		outdir: "./dist/esm",
		format: "esm",
		target: "node",
		minify: true,
		splitting: true,
		external: ["./node_modules"]
	});

	if (!result.success) {
		for (const log of result.logs) {
			console.error(log);
		}
		throw new Error("JavaScript build failed");
	}

	console.log("JavaScript build completed successfully!");
}

buildProject().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

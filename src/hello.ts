/**
 * Generates a greeting message.
 * @param name - The name of the person to greet. Defaults to an empty string.
 * @returns The greeting message.
 */
function hello(name = ""): string {
	return name === "" ? "Hello!" : `Hello ${name}!`;
}

export { hello };

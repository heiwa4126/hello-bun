import { hello } from "./hello";

describe("hello", () => {
	it('should return "Hello!" when no name is provided', () => {
		expect(hello()).toBe("Hello!");
	});

	it('should return "Hello {name}!" when a name is provided', () => {
		expect(hello("John")).toBe("Hello John!");
		expect(hello("Alice")).toBe("Hello Alice!");
	});
});

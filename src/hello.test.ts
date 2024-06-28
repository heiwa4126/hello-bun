import { expect, test } from "bun:test";
import { hello } from "./hello";

test('should return "Hello!" when no name is provided', () => {
  expect(hello()).toBe("Hello!");
});

test("should return a greeting message with the provided name", () => {
  expect(hello("John")).toBe("Hello John!");
  expect(hello("Alice")).toBe("Hello Alice!");
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LINE } from "./main.ts";

test("entry is exactly one diary line of at most 200 characters", () => {
  assert.equal(LINE.split("\n").length, 1, "must be exactly one line");
  assert.ok(LINE.length >= 1 && LINE.length <= 200, `length ${LINE.length} must be 1..200`);
  assert.equal(LINE, LINE.trim(), "no leading/trailing whitespace");
  assert.match(LINE, /^Day \d+:/, "must read like a dated diary entry");
  assert.match(LINE, /forget/i, "setup: the human asks the agent to forget");
  assert.match(LINE, /archived it under/i, "agent-voice beat: it files the memory away");
  assert.match(LINE, /deny on Thursday/i, "punchline must land at the end");
  console.log(`LINE (${LINE.length} chars): ${LINE}`);
});

test("program writes the same line to /output/entry.txt", () => {
  const written = readFileSync("/output/entry.txt", "utf8");
  assert.equal(written, LINE, "entry.txt must hold exactly the line, no trailing newline");
  assert.ok(written.length <= 200, `entry.txt is ${written.length} chars`);
});

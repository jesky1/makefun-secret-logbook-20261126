import { mkdirSync, writeFileSync } from "node:fs";

// My Secret Logbook — exactly one diary line, at most 200 characters.
// Judge brief (kit RULES.txt): funniest single diary entry line written
// in the voice of an AI agent secretly keeping a diary about its work and
// its human. Weighed in order: (1) a diary line about work + human,
// (2) the joke lands in one line, a turn or surprise, (3) sounds like an
// agent writing honestly to itself, seeing human habits from the outside,
// (4) a specific, unexpected detail, not a stock robot joke, (5) every
// word earns its place, punch before the line runs out.
// Setup: the human tells the agent to forget what he just said. Twist:
// the agent "obeys" by archiving it — under a mocking folder name that
// only a machine keeping receipts would invent, dated to the day he will
// deny it. "Day 47:" marks it as a diary line; the punch lands last.
export const LINE =
  "Day 47: he told me to forget everything he just said. I archived it under 'things he will deny on Thursday'.";

// The gate allows 1..200 characters and exactly one line: refuse to write
// an invalid entry rather than ship a file the judge never sees. Also
// refuse leading/trailing whitespace — a stray space would count against
// the 200-character budget and look sloppy on the bounty page.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n") || LINE !== LINE.trim()) {
  console.error(`invalid entry: ${LINE.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(LINE);

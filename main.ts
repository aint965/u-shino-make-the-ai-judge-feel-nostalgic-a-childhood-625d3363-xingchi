import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "Every August evening my grandmother called us in from the yard, the rice steaming and the screen door banging, and I ran barefoot across the warm concrete to a plate already waiting at my place at the table.";

function fail(reason: string): never {
  console.error(`Invalid entry: ${reason}`);
  process.exit(1);
}

// Validate the sentence against the sealed gate (UTF-8 text, 1 to 280
// characters, not only white space) plus the single-sentence requirement
// BEFORE writing anything: a line that broke the gate must never be
// written and scored 0. Refuse with a clear error and a non-zero exit.
const text = SENTENCE;
if (text.trim().length === 0) {
  fail("entry is empty or only whitespace");
}
if (text.length > 280) {
  fail(`entry is ${text.length} characters, over the 280-character limit`);
}
if (!/[.!?]$/.test(text.trim())) {
  fail("entry does not end with sentence-ending punctuation");
}
const body = text.trim().replace(/[.!?]$/, "");
if (/[.!?]/.test(body)) {
  fail("entry contains more than one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

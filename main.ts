import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "Every August evening my grandmother called us in from the yard, the rice steaming and the screen door banging, and I ran barefoot across the warm concrete to a plate already waiting at my place at the table.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");

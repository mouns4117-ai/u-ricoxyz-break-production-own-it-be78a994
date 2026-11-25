import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Production is down because I deployed at 4:59 p.m. on a Friday. The tests passed on my laptop. My laptop is not production. The outage is now in hour three.";

// Fail fast: the gate requires UTF-8 text of 1 to 200 characters, a single
// non-blank line. Refuse to write anything that would fail it.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters; gate requires 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.trim() === "") {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-7/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

let startIndex = 0;

const startLine = lines[0];

[...startLine].forEach((char, charIndex) => {
  if (char === "S") {
    startIndex = charIndex;
  }
});

let beamIndexes = new Set<number>([startIndex]);

for (let i = 1; i < lines.length; i++) {
  let newIndexes = new Set<number>([]);
  const chars = [...lines[i]];

  beamIndexes.forEach((beamIndex) => {
    const char = chars[beamIndex];

    if (char === ".") {
      newIndexes.add(beamIndex);
    } else {
      result++;
      // TODO out of bounds?
      newIndexes.add(beamIndex - 1);
      newIndexes.add(beamIndex + 1);
    }
  });

  console.log(beamIndexes);

  beamIndexes = newIndexes;
}

console.log("result", result);

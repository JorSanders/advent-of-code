import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-7/part-2/input.txt", "utf-8")
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

let beamIndexes = new Map<number, number>();

beamIndexes.set(startIndex, 1);

console.log("000-" + startLine);

for (let i = 1; i < lines.length; i++) {
  let newIndexes = new Map<number, number>();
  const chars = [...lines[i]];

  beamIndexes.forEach((value, key) => {
    const char = chars[key];

    if (char === ".") {
      newIndexes.set(key, value);
    } else {
      const left = newIndexes.get(key - 1);
      const leftValue = (left ?? 0) + value;
      newIndexes.set(key - 1, leftValue);

      const right = newIndexes.get(key + 1);
      const rightValue = (right ?? 0) + value;
      newIndexes.set(key + 1, rightValue);
    }
  });

  const debugChars: string[] = [i.toString().padStart(3, "0"), "-"];

  for (let j = 0; j < lines[i].length; j++) {
    const beam = newIndexes.get(j);
    if (beam) {
      debugChars.push(beam.toString());
      // debugChars.push("|");
    } else {
      debugChars.push(chars[j]);
    }
  }

  console.log(debugChars.join(""));

  beamIndexes = newIndexes;
}

beamIndexes.forEach((value, _key) => {
  result += value;
});

console.log("result", result);

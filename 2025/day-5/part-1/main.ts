import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-5/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

const freshRanges = new Set<number[]>([]);
const ids = new Set<number>([]);

lines.forEach((line) => {
  const rangeMatches = line.match(/\d+-\d+/g);
  const idMatch = line.match(/\d+/g);

  if (rangeMatches) {
    const bla = line.split("-");
    const lower = Number.parseInt(bla[0]);
    const higher = Number.parseInt(bla[1]);

    freshRanges.add([lower, higher]);
  } else if (idMatch) {
    const bla = Number.parseInt(line);
    ids.add(bla);
  }
});

ids.forEach((id) => {
  const isFresh = [...freshRanges].some((freshRange) => {
    return id >= freshRange[0] && id <= freshRange[1];
  });

  if (isFresh) {
    result++;
  }
});

console.log("result", result);

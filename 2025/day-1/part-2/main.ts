import fs from "node:fs";

const programPipes: Record<number, number[]> = {};

const data = fs
  .readFileSync("2025/day-1/part-2/input.txt", "utf-8")
  .trim()
  .split("\n");

let dial = 50;
let counter = 0;
let legacy = 0;

const rotations: number[] = [];

for (const line of data) {
  const match = line.match(/\d+/);

  if (!match) {
    continue;
  }

  const numberValue = Number.parseInt(match[0]);
  const left = line.startsWith("L");
  const value = left ? numberValue * -1 : numberValue;
  rotations.push(value);
}

for (const rotation of rotations) {
  const rotated = dial + rotation;
  const modulo = rotated % 100;
  let newDial = rotated > 0 ? modulo : 100 + modulo;
  if (newDial === 100) {
    newDial = 0;
  }

  let hits = 0;

  if (rotated >= 100) {
    hits = Math.floor(rotated / 100);
  }

  if (rotated <= 0) {
    hits = Math.floor(rotated / -100);
    if (dial !== 0) {
      hits++;
    }
  }

  console.log({ hits, dial, rotated, rotation, modulo, newDial, counter });

  counter += hits;

  if (newDial === 0) {
    legacy++;
  }

  dial = newDial;
}

console.log("counter: ", counter);
console.log("legacy: ", legacy);

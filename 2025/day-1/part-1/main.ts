import fs from "node:fs";

const programPipes: Record<number, number[]> = {};

const data = fs
  .readFileSync("2025/day-1/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let dial = 50;
let counter = 0;

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
  dial += rotation;
  const modulo = dial % 100;
  if (modulo === 0 || modulo === -0) {
    counter++;
  }
}

console.log("counter: ", counter);

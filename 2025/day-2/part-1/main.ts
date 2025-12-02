import fs from "node:fs";

const data = fs
  .readFileSync("2025/day-2/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

for (const line of data) {
  const matches = line.match(/\d+/g);

  if (!matches) {
    continue;
  }

  let previous = 0;
  let isLower = false;

  for (const match of matches) {
    const numberValue = Number.parseInt(match);
    isLower = !isLower;

    if (isLower) {
      previous = numberValue;
      continue;
    }

    if (previous > numberValue) {
      throw new Error("fuck");
    }

    for (let i = previous; i <= numberValue; i++) {
      const numberString = i.toString();
      if (numberString.length % 2 !== 0) {
        continue;
      }
      const firstHalf = numberString.slice(0, numberString.length / 2);
      const secondHalf = numberString.slice(numberString.length / 2);

      if (firstHalf === secondHalf) {
        result += i;
      }
    }
  }
}

console.log(result);

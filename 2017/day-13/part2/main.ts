import fs from "fs";

const input: number[] = [];

const data = fs
  .readFileSync("2017/day-13/part2/input.txt", "utf-8")
  .trim()
  .split("\n");

data.forEach((line) => {
  const [keyPart, valuePart] = line.split(": ");
  const key = parseInt(keyPart);
  const value = parseInt(valuePart);
  input[key] = value;
});

const checkWithDelay = (delay: number) => {
  for (let i = 0; i < input.length; i++) {
    const fwLength = input[i];

    if (!fwLength) {
      continue;
    }

    const iteration = fwLength + fwLength - 2;
    const hit = (i + delay) % iteration === 0;

    if (hit) {
      return false;
    }
  }
  return true;
};

let i = 0;
do {
  const hitless = checkWithDelay(i);
  if (hitless) {
    break;
  }
  console.log(i, "not hitless");
  i++;
} while (true);

console.log(i);

/** 3
 * 0 4 8
 * 1 3 5 7
 * 2 6
 */

/** 5
 * 0 8 16
 * 1 7 9 15 17
 * 2 6 10 14 18
 * 3 5 11 13 19
 * 4 12 20
 */

/** 2
 * 0 2 4 6
 * 1 3 5 7
 */

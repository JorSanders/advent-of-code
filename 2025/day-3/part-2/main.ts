import fs from "node:fs";

const data = fs
  .readFileSync("2025/day-3/part-2/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

const getBiggestWithRemaining = (input: string, size: number) => {
  for (let i = 9; i > -1; i--) {
    const iString = i.toString();
    const iIndex = input.indexOf(iString);
    if (iIndex === -1) {
      continue;
    }

    if (size + iIndex > input.length) {
      // console.log({
      //   i,
      //   iIndex,
      //   length: input.length,
      //   size,
      //   right: size + iIndex + 1,
      // });
      continue;
    }

    const split = input.slice(iIndex + 1);

    // console.log({ input, size, i, iIndex, split, length: input.length });

    return [split, i];
  }
  throw new Error("fuck");
};

for (const line of data) {
  const matches = line.match(/\d+/g);

  if (!matches) {
    continue;
  }

  const bank = matches[0];
  let bankString = bank;

  const joltSize = 12;
  let joltString = "";

  for (let i = joltSize; i > 0; i--) {
    const [split, value] = getBiggestWithRemaining(bankString, i);
    bankString = split as string;
    joltString += value.toString();
    console.log(joltString);
  }

  const joltNumber = Number.parseInt(joltString);
  console.log(joltString);
  result += joltNumber;
}

console.log(result);

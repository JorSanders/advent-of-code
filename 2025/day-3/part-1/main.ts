import fs from "node:fs";

const data = fs
  .readFileSync("2025/day-3/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

for (const line of data) {
  const matches = line.match(/\d+/g);

  if (!matches) {
    continue;
  }

  const bank = matches[0];

  for (let i = 9; i > -1; i--) {
    const iString = i.toString();
    const iIndex = bank.indexOf(iString);

    if (iIndex === -1 || iIndex === bank.length - 1) {
      continue;
    }

    const bankSplit = bank.slice(iIndex + 1);

    for (let j = 9; j > -1; j--) {
      if (bankSplit.includes(j.toString())) {
        const bla = i * 10 + j;
        result += bla;
        break;
      }
    }
    // console.log({ bank, bankSplit, iIndex, iString, length: bank.length });
    break;
  }
}

console.log(result);

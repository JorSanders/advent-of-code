import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-6/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

const equations: number[][] = [];

const signsLine = lines[lines.length - 1];
const signs = signsLine.split(" ").filter((x) => x);

const numberLines = lines.slice(0, lines.length - 1);

numberLines.forEach((line) => {
  const segments = line.split(" ");
  const segmentsNumbers = segments
    .map((x) => {
      return Number.parseInt(x);
    })
    .filter((x) => {
      return !Number.isNaN(x);
    });
  equations.push(segmentsNumbers);
});

signs.forEach((sign, signIndex) => {
  const numbers = equations.map((equation) => {
    return equation[signIndex];
  });

  const total = numbers.reduce(
    (prev, current) => {
      if (sign === "+") {
        return prev + current;
      } else if (sign === "*") {
        return prev * current;
      }
      throw new Error("fuck");
    },
    sign === "*" ? 1 : 0
  );
  console.log(sign, numbers, total);
  result += total;
});

console.log("result", result);

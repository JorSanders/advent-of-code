import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-5/part-2/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

let freshRanges: number[][] = [];

lines.forEach((line) => {
  const rangeMatches = line.match(/\d+-\d+/g);

  if (rangeMatches) {
    const bla = line.split("-");
    const lower = Number.parseInt(bla[0]);
    const higher = Number.parseInt(bla[1]);
    let newRanges: number[][] = [];
    let blaRanges: number[][] = [];

    freshRanges.forEach((freshRange) => {
      if (lower >= freshRange[0] && lower <= freshRange[1]) {
        blaRanges.push(freshRange);
      } else if (higher >= freshRange[0] && higher <= freshRange[1]) {
        blaRanges.push(freshRange);
      } else if (freshRange[0] >= lower && freshRange[0] <= higher) {
        blaRanges.push(freshRange);
      } else if (freshRange[1] >= lower && freshRange[1] <= higher) {
        blaRanges.push(freshRange);
      } else {
        newRanges.push(freshRange);
      }
    });

    const newBlaRange = blaRanges.reduce(
      (prev, current) => {
        const newLow = Math.min(current[0], prev[0]);
        const newHigh = Math.max(current[1], prev[1]);
        return [newLow, newHigh];
      },
      [lower, higher]
    );

    newRanges.push(newBlaRange);

    freshRanges = newRanges;
  }
});

console.log(
  freshRanges.sort((a, b) => {
    return a[0] - b[0];
  })
);

result = freshRanges.reduce((counter, currentValue) => {
  return counter + currentValue[1] - currentValue[0] + 1;
}, 0);

console.log("result", result);

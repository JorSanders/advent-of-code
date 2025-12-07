import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-6/part-2/input.txt", "utf-8")
  .split("\n");

let result = 0;

const signsLine = lines[lines.length - 1];

const numberLines = lines.slice(0, lines.length - 1);

const findPositions = (line: string, pattern: RegExp): number[] => {
  const positions: number[] = [];
  const regex = new RegExp(pattern, "g");
  let match;
  while ((match = regex.exec(line)) !== null) {
    positions.push(match.index);
  }
  return positions;
};

numberLines.forEach((numberLine) => {});

const positions = findPositions(signsLine, /\+|\*/);

positions.forEach((position, positionIndex) => {
  const top =
    positionIndex === positions.length - 1
      ? signsLine.length
      : positions[positionIndex + 1] - 1;

  const myNumbers: number[] = [];

  for (let charPos = position; charPos < top; charPos++) {
    const myNumberChars = [];
    for (let linePos = 0; linePos < numberLines.length; linePos++) {
      const char = numberLines[linePos][charPos];
      const number = Number.parseInt(char);
      if (!Number.isNaN(number)) {
        myNumberChars.push(number);
      }
    }
    const numberString = myNumberChars.join("");

    myNumbers.push(Number.parseInt(numberString));
  }

  const sign = signsLine[position];

  const total = myNumbers.reduce(
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
  console.log(sign, myNumbers, total);
  result += total;
});

console.log(signsLine.length);

console.log("result", result);

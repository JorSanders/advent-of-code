import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-4/part-2/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

const map: string[][] = [];

let removedLastRun = 0;
do {
  console.log("\n\n");
  removedLastRun = 0;
  lines.forEach((line, lineIndex) => {
    const chars = [...line];

    const updatedLine: string[] = [];

    chars.forEach((char, charIndex) => {
      if (char === "@") {
        let hits = 0;
        for (
          let i = Math.max(lineIndex - 1, 0);
          i < Math.min(lineIndex + 2, lines.length);
          i++
        ) {
          for (
            let j = Math.max(charIndex - 1, 0);
            j < Math.min(charIndex + 2, line.length);
            j++
          ) {
            // console.log(i, j);
            if (i === lineIndex && j === charIndex) {
              continue;
            }
            if (lines[i][j] === "@") {
              // console.log({ lineIndex, charIndex, i, j });
              hits++;
            }
          }
        }
        // console.log("----", { lineIndex, charIndex, hits });

        if (hits < 4) {
          result++;
          removedLastRun++;
          updatedLine.push("R");
        } else {
          updatedLine.push(char);
        }
        // debugLine.push(hits.toString());
      } else {
        updatedLine.push(char);
      }
    });

    lines[lineIndex] = updatedLine.join("");

    console.log(updatedLine.join(""));
  });
} while (removedLastRun > 0);

console.log(map);

console.log("result", result);

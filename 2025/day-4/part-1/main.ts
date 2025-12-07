import fs from "node:fs";

const lines = fs
  .readFileSync("2025/day-4/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

let result = 0;

const map: string[][] = [];

lines.forEach((line, lineIndex) => {
  const chars = [...line];

  const debugLine: string[] = [];

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
        debugLine.push("X");
      } else {
        debugLine.push(char);
      }
      // debugLine.push(hits.toString());
    } else {
      debugLine.push(char);
    }
  });

  console.log(debugLine.join(""));
});

console.log(map);

console.log("result", result);

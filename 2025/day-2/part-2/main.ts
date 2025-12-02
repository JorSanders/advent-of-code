import fs from "node:fs";

const data = fs
  .readFileSync("2025/day-2/part-2/input.txt", "utf-8")
  .trim()
  .split("\n");

// writeFileSync("2025/day-2/part-2/debug.txt", "", { flag: "w" });

const symetricalNumbers = new Set<number>([]);
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

    for (let iterNumber = previous; iterNumber <= numberValue; iterNumber++) {
      const numberString = iterNumber.toString();
      if (numberString.length < 2) {
        continue;
      }
      let add = false;
      for (
        let chunkSize = 1;
        chunkSize < numberString.length / 2 + 1;
        chunkSize++
      ) {
        if (numberString.length % chunkSize !== 0) {
          continue;
        }

        const partCount = numberString.length / chunkSize;
        let previous = "";
        let symetrical = true;

        for (let chunkIndex = 0; chunkIndex < partCount; chunkIndex++) {
          const part = numberString.slice(
            chunkIndex * chunkSize,
            (chunkIndex + 1) * chunkSize
          );
          if (chunkIndex > 0) {
            if (part !== previous) {
              // console.log({ part, previous });
              symetrical = false;
            }
          }

          previous = part;
        }
        if (symetrical) {
          add = true;
          symetricalNumbers.add(iterNumber);
        }
      }

      if (!add) {
        // appendFileSync("2025/day-2/part-2/debug.txt", `${iterNumber}\n`);
        // console.log(iterNumber);
      }
    }
  }
}

for (const n of symetricalNumbers) {
  // console.log(n);
  result += n;
}

console.log(result);

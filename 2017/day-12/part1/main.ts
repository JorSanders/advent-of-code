import fs from "fs";

const programPipes: Record<number, number[]> = {};

const data = fs
  .readFileSync("2017/day-12/part1/input.txt", "utf-8")
  .trim()
  .split("\n");

data.forEach((line) => {
  const [keyPart, valuesPart] = line.split(" <-> ");
  const key = parseInt(keyPart);
  const values = valuesPart.split(",").map((v) => parseInt(v.trim()));
  programPipes[key] = values;
});

// 0 <-> 2
// 1 <-> 1
// 2 <-> 0, 3, 4
// 3 <-> 2, 4
// 4 <-> 2, 3, 6
// 5 <-> 6
// 6 <-> 4, 5

// const programPipes: Record<number, number[]> = {
//   0: [2],
//   1: [1],
//   2: [0, 3, 4],
//   3: [2, 4],
//   4: [2, 3, 6],
//   5: [6],
//   6: [4, 5],
// };

const programs: Set<number> = new Set([]);
const checked: Set<number> = new Set([]);

const getProgramPipes = (program: number) => {
  const reachAble = programPipes[program];

  if (!reachAble) {
    return;
  }

  reachAble.forEach((n) => programs.add(n));
  checked.add(program);

  reachAble.forEach((n) => {
    if (!checked.has(n)) {
      getProgramPipes(n);
    }
  });
};

programs.add(0);
getProgramPipes(0);

console.log("result: ", programs.size);

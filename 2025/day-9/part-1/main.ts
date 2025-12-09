import fs from "node:fs";

let result = 0;

const lines = fs
  .readFileSync("2025/day-9/part-1/input.txt", "utf-8")
  .trim()
  .split("\n");

const points: [number, number][] = [];

lines.forEach((line) => {
  const parts = line.split(",");
  const position: [number, number] = [
    Number.parseInt(parts[0]),
    Number.parseInt(parts[1]),
  ];
  points.push(position);
});

const calculateDistance = (a: [number, number], b: [number, number]) => {
  const dx = Math.abs(a[0] - b[0]) + 1;
  const dy = Math.abs(a[1] - b[1]) + 1;
  // console.log({ dx, dy });
  return dx * dy;
};

const fromDistanceToMap = new Map<number, [number, number][]>([]);

for (let i = 0; i < points.length; i++) {
  const distanceToMap: [number, number][] = [];

  for (let j = 0; j < points.length; j++) {
    const distance = calculateDistance(points[i], points[j]);

    result = Math.max(distance, result);
    if (i === j) {
      continue;
    }
    distanceToMap.push([calculateDistance(points[i], points[j]), j]);
  }
  const sorted = distanceToMap.sort((a, b) => {
    return a[0] - b[0];
  });
  fromDistanceToMap.set(i, sorted);
}

// const test = calculateDistance([2, 5], [11, 1]);

// console.log(fromDistanceToMap);

// console.log(test);

console.log("result", result);

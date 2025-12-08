import fs from "node:fs";

let result = 0;

const lines = fs
  .readFileSync("2025/day-8/part-2/input.txt", "utf-8")
  .trim()
  .split("\n");

const points: [number, number, number][] = [];

lines.forEach((line) => {
  const parts = line.split(",");
  const position: [number, number, number] = [
    Number.parseInt(parts[0]),
    Number.parseInt(parts[1]),
    Number.parseInt(parts[2]),
  ];
  points.push(position);
});

// Hard yoinked from gpt
const distance = (a: [number, number, number], b: [number, number, number]) => {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  // return Math.sqrt(dx * dx + dy * dy + dz * dz);
  return dx * dx + dy * dy + dz * dz;
};

const fromDistanceToMap = new Map<number, [number, number][]>([]);
let circuits: Set<number>[] = [];

for (let i = 0; i < points.length; i++) {
  const distanceToMap: [number, number][] = [];

  for (let j = 0; j < points.length; j++) {
    if (i === j) {
      continue;
    }
    distanceToMap.push([distance(points[i], points[j]), j]);
  }
  const sorted = distanceToMap.sort((a, b) => {
    return a[0] - b[0];
  });
  fromDistanceToMap.set(i, sorted);
}

const connections: Set<string> = new Set();

const findLowestDistance = () => {
  let lowestFromDistanceTo: [number, number, number] = [
    -1,
    Number.MAX_SAFE_INTEGER,
    -1,
  ];

  fromDistanceToMap.forEach((value, key) => {
    for (let i = 0; i < value.length; i++) {
      const distanceTo = value[i];
      if (
        // Unalive me pls
        connections.has(`${key}-${distanceTo[1]}`) ||
        connections.has(`${distanceTo[1]}-${key}`)
      ) {
        continue;
      }

      if (lowestFromDistanceTo[1] > distanceTo[0]) {
        lowestFromDistanceTo = [key, distanceTo[0], distanceTo[1]];
      }

      break;
    }
  });

  return lowestFromDistanceTo;
};

let lastConnection: [number, number] = [0, 0];

do {
  const found = findLowestDistance();
  const newCircuits: Set<number>[] = [];

  const letsMerge: Set<number>[] = [];

  circuits.forEach((circuit) => {
    if (circuit.has(found[0]) || circuit.has(found[2])) {
      letsMerge.push(circuit);
    } else {
      newCircuits.push(circuit);
    }
  });

  connections.add(`${found[0]}-${found[2]}`);
  lastConnection = [found[0], found[2]];

  if (letsMerge.length > 0) {
    const merged = letsMerge.reduce((prev, current) => {
      return new Set([...prev, ...current]);
    }, new Set([found[0], found[2]]));
    newCircuits.push(merged);
  } else {
    const newCircuit = new Set([found[0], found[2]]);
    newCircuits.push(newCircuit);
  }

  circuits = newCircuits;
} while (circuits[0].size !== fromDistanceToMap.size);

result = points[lastConnection[0]][0] * points[lastConnection[1]][0];

console.log("result", result);

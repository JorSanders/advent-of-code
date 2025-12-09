import fs from "node:fs";

let result = 0;

const lines = fs
  .readFileSync("2025/day-9/part-2/input.txt", "utf-8")
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

const calculateSurface = (a: [number, number], b: [number, number]) => {
  const dx = Math.abs(a[0] - b[0]) + 1;
  const dy = Math.abs(a[1] - b[1]) + 1;
  return dx * dy;
};

const intersects = (
  a: [[number, number], [number, number]],
  b: [[number, number], [number, number]]
) => {
  console.log({ a, b });

  const aXMin = Math.min(a[0][0], a[1][0]);
  const aXMax = Math.max(a[0][0], a[1][0]);
  const aYMin = Math.min(a[0][1], a[1][1]);
  const aYMax = Math.max(a[0][1], a[1][1]);

  const bXMin = Math.min(b[0][0], b[1][0]);
  const bXMax = Math.max(b[0][0], b[1][0]);
  const bYMin = Math.min(b[0][1], b[1][1]);
  const bYMax = Math.max(b[0][1], b[1][1]);

  if (bXMin > aXMin && bXMin < aXMax) {
    return true;
  }

  if (bXMax > aXMin && bXMax < aXMax) {
    return true;
  }

  if (bYMin > aYMin && bYMin < aYMax) {
    return true;
  }

  if (bYMax > aYMin && bYMax < aYMax) {
    return true;
  }

  return false;
};

for (let i = 0; i < points.length; i++) {
  // if (i !== 4) {
  //   continue;
  // }
  for (let j = 0; j < points.length; j++) {
    if (i === j) {
      continue;
    }
    // if (j !== 1) {
    //   continue;
    // }
    let invalid = false;
    for (let k = 0; k < points.length; k++) {
      const nextK = k === points.length - 1 ? 0 : k + 1;
      const bla = intersects(
        [points[i], points[j]],
        [points[k], points[nextK]]
      );
      console.log(bla);
      if (bla) {
        invalid = true;
        break;
      }
    }
    if (invalid) {
      continue;
    }
    const surface = calculateSurface(points[i], points[j]);

    result = Math.max(surface, result);
  }
}

console.log(
  intersects(
    [
      [2, 5],
      [11, 1],
    ],
    [
      [0, 2],
      [2, 6],
    ]
  )
);

console.log("result", result);

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

const checkIntersects = (
  a: [[number, number], [number, number]],
  b: [[number, number], [number, number]]
) => {
  // console.log({ a, b });

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

const isOnLine = (
  a: [[number, number], [number, number]],
  b: [[number, number], [number, number]]
) => {
  // console.log({ a, b });

  const aXMin = Math.min(a[0][0], a[1][0]);
  const aXMax = Math.max(a[0][0], a[1][0]);
  const aYMin = Math.min(a[0][1], a[1][1]);
  const aYMax = Math.max(a[0][1], a[1][1]);

  const bXMin = Math.min(b[0][0], b[1][0]);
  const bXMax = Math.max(b[0][0], b[1][0]);
  const bYMin = Math.min(b[0][1], b[1][1]);
  const bYMax = Math.max(b[0][1], b[1][1]);

  if (aXMin > bXMin && aXMin < bXMax) return false;
};

const getOpposites = (
  a: [number, number],
  b: [number, number]
): [[number, number], [number, number]] => {
  const c: [number, number] = [a[0], b[1]];
  const d: [number, number] = [a[1], b[0]];
  return [c, d];
};

for (let i = 0; i < points.length; i++) {
  // if (i !== 5) {
  //   continue;
  // }
  for (let j = 0; j < points.length; j++) {
    if (i === j) {
      continue;
    }
    // if (j !== 1) {
    //   continue;
    // }
    let valid = false;
    for (let k = 0; k < points.length; k++) {
      const nextK = k === points.length - 1 ? 0 : k + 1;
      const opposites = getOpposites(points[i], points[j]);
      // const doesIntersect = checkIntersects(opposites, [
      //   points[k],
      //   points[nextK],
      // ]);

      if (i === k || i === nextK || j === k || j === nextK) {
        continue;
      }

      const doesIntersectK = checkIntersects(
        [points[k], points[nextK]],
        [opposites[0], opposites[0]]
      );

      const doesIntersectNext = checkIntersects(
        [points[k], points[nextK]],
        [opposites[1], opposites[1]]
      );

      const doesIntersect = doesIntersectK && doesIntersectNext;

      // console.log(bla);
      if (doesIntersect) {
        console.log({ opposites });
        console.log([points[k], points[nextK]]);
        console.log({ i, j, k, nextK });
        valid = true;
        break;
      }
    }
    if (!valid) {
      continue;
    }
    const surface = calculateSurface(points[i], points[j]);

    console.log({ surface, i, j });

    result = Math.max(surface, result);
  }
}

console.log(
  checkIntersects(
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

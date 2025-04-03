import { getShapes } from "./main.js";
import seedrandom from "seedrandom";

const normalForms = [
  [],
  [0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 1, 2],
  [0, 1, 3],
  [0, 2, 3],
  [0, 1, 4],
  [0, 3, 4],
  [0, 1, 5],
  [0, 4, 5],
  [0, 1, 6],
  [0, 5, 6],
  [0, 2, 4],
  [0, 2, 5],
  [0, 3, 5],
  [0, 2, 6],
  [0, 4, 6],
  [0, 2, 7],
  [0, 3, 6],
  [0, 3, 7],
  [0, 4, 7],
  [0, 4, 8],
  [0, 1, 2, 3],
  [0, 1, 2, 4],
  [0, 2, 3, 4],
  [0, 1, 3, 4],
  [0, 1, 2, 5],
  [0, 3, 4, 5],
  [0, 1, 2, 6],
  [0, 4, 5, 6],
  [0, 1, 2, 7],
  [0, 1, 4, 5],
  [0, 1, 5, 6],
  [0, 1, 6, 7],
  [0, 2, 3, 5],
  [0, 1, 3, 5],
  [0, 2, 4, 5],
  [0, 2, 3, 6],
  [0, 3, 4, 6],
  [0, 1, 3, 6],
  [0, 3, 5, 6],
  [0, 2, 3, 7],
  [0, 4, 5, 7],
  [0, 1, 4, 6],
  [0, 2, 5, 6],
  [0, 1, 5, 7],
  [0, 2, 6, 7],
  [0, 3, 4, 7],
  [0, 1, 4, 7],
  [0, 3, 6, 7],
  [0, 1, 4, 8],
  [0, 3, 4, 8],
  [0, 1, 5, 8],
  [0, 2, 4, 6],
  [0, 2, 4, 7],
  [0, 3, 5, 7],
  [0, 2, 5, 7],
  [0, 2, 4, 8],
  [0, 2, 6, 8],
  [0, 3, 5, 8],
  [0, 2, 5, 8],
  [0, 3, 6, 8],
  [0, 3, 6, 9],
  [0, 1, 3, 7],
  [0, 4, 6, 7],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 5],
  [0, 2, 3, 4, 5],
  [0, 1, 2, 4, 5],
  [0, 1, 3, 4, 5],
  [0, 1, 2, 3, 6],
  [0, 3, 4, 5, 6],
  [0, 1, 2, 3, 7],
  [0, 4, 5, 6, 7],
  [0, 1, 2, 5, 6],
  [0, 1, 4, 5, 6],
  [0, 1, 2, 6, 7],
  [0, 1, 5, 6, 7],
  [0, 2, 3, 4, 6],
  [0, 1, 2, 4, 6],
  [0, 2, 4, 5, 6],
  [0, 1, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [0, 2, 3, 4, 7],
  [0, 3, 4, 5, 7],
  [0, 1, 3, 5, 6],
  [0, 1, 2, 4, 8],
  [0, 2, 3, 4, 8],
  [0, 1, 2, 5, 7],
  [0, 2, 5, 6, 7],
  [0, 1, 2, 6, 8],
  [0, 1, 3, 4, 7],
  [0, 3, 4, 6, 7],
  [0, 1, 3, 4, 8],
  [0, 1, 4, 5, 7],
  [0, 2, 3, 6, 7],
  [0, 1, 3, 6, 7],
  [0, 1, 4, 6, 7],
  [0, 1, 5, 6, 8],
  [0, 2, 3, 7, 8],
  [0, 1, 4, 5, 8],
  [0, 3, 4, 7, 8],
  [0, 1, 4, 7, 8],
  [0, 2, 3, 5, 7],
  [0, 2, 4, 5, 7],
  [0, 1, 3, 5, 7],
  [0, 2, 4, 6, 7],
  [0, 2, 3, 5, 8],
  [0, 3, 5, 6, 8],
  [0, 2, 4, 5, 8],
  [0, 3, 4, 6, 8],
  [0, 1, 3, 5, 8],
  [0, 3, 5, 7, 8],
  [0, 2, 3, 6, 8],
  [0, 2, 5, 6, 8],
  [0, 1, 3, 6, 8],
  [0, 2, 5, 7, 8],
  [0, 1, 4, 6, 8],
  [0, 2, 4, 7, 8],
  [0, 1, 3, 6, 9],
  [0, 2, 3, 6, 9],
  [0, 1, 4, 6, 9],
  [0, 2, 5, 6, 9],
  [0, 2, 4, 6, 8],
  [0, 2, 4, 6, 9],
  [0, 2, 4, 7, 9],
  [0, 1, 2, 4, 7],
  [0, 3, 5, 6, 7],
  [0, 3, 4, 5, 8],
  [0, 1, 2, 5, 8],
  [0, 3, 6, 7, 8],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 6],
  [0, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 5, 6],
  [0, 1, 3, 4, 5, 6],
  [0, 1, 2, 4, 5, 6],
  [0, 1, 2, 3, 6, 7],
  [0, 1, 4, 5, 6, 7],
  [0, 1, 2, 5, 6, 7],
  [0, 1, 2, 6, 7, 8],
  [0, 2, 3, 4, 5, 7],
  [0, 1, 2, 3, 5, 7],
  [0, 2, 4, 5, 6, 7],
  [0, 1, 3, 4, 5, 7],
  [0, 2, 3, 4, 6, 7],
  [0, 1, 2, 4, 5, 7],
  [0, 2, 3, 5, 6, 7],
  [0, 1, 2, 4, 6, 7],
  [0, 1, 3, 5, 6, 7],
  [0, 1, 3, 4, 6, 7],
  [0, 1, 3, 4, 5, 8],
  [0, 3, 4, 5, 7, 8],
  [0, 1, 2, 4, 5, 8],
  [0, 3, 4, 6, 7, 8],
  [0, 1, 4, 5, 6, 8],
  [0, 2, 3, 4, 7, 8],
  [0, 1, 2, 4, 7, 8],
  [0, 1, 4, 6, 7, 8],
  [0, 1, 2, 5, 7, 8],
  [0, 1, 3, 6, 7, 8],
  [0, 1, 3, 4, 7, 8],
  [0, 1, 4, 5, 7, 8],
  [0, 1, 4, 5, 8, 9],
  [0, 2, 3, 4, 6, 8],
  [0, 2, 4, 5, 6, 8],
  [0, 1, 2, 4, 6, 8],
  [0, 2, 4, 6, 7, 8],
  [0, 2, 3, 5, 6, 8],
  [0, 1, 3, 4, 6, 8],
  [0, 2, 4, 5, 7, 8],
  [0, 1, 3, 5, 6, 8],
  [0, 2, 3, 5, 7, 8],
  [0, 1, 3, 5, 7, 8],
  [0, 1, 3, 4, 6, 9],
  [0, 2, 3, 5, 6, 9],
  [0, 1, 3, 5, 6, 9],
  [0, 2, 3, 6, 7, 9],
  [0, 1, 3, 6, 7, 9],
  [0, 2, 3, 6, 8, 9],
  [0, 1, 4, 5, 7, 9],
  [0, 2, 4, 5, 8, 9],
  [0, 2, 4, 5, 7, 9],
  [0, 2, 3, 5, 7, 9],
  [0, 2, 4, 6, 7, 9],
  [0, 1, 3, 5, 7, 9],
  [0, 2, 4, 6, 8, 9],
  [0, 2, 4, 6, 8, 10],
  [0, 1, 2, 3, 4, 7],
  [0, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 8],
  [0, 1, 2, 3, 7, 8],
  [0, 2, 3, 4, 5, 8],
  [0, 3, 4, 5, 6, 8],
  [0, 1, 2, 3, 5, 8],
  [0, 3, 5, 6, 7, 8],
  [0, 1, 2, 3, 6, 8],
  [0, 2, 5, 6, 7, 8],
  [0, 1, 2, 3, 6, 9],
  [0, 1, 2, 5, 6, 8],
  [0, 2, 3, 6, 7, 8],
  [0, 1, 2, 5, 6, 9],
  [0, 1, 4, 5, 6, 9],
  [0, 2, 3, 4, 6, 9],
  [0, 1, 2, 4, 6, 9],
  [0, 2, 4, 5, 6, 9],
  [0, 1, 2, 4, 7, 9],
  [0, 2, 3, 4, 7, 9],
  [0, 1, 2, 5, 7, 9],
  [0, 1, 3, 4, 7, 9],
  [0, 1, 4, 6, 7, 9],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 4, 5, 7],
  [0, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 8],
  [0, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 6, 7],
  [0, 1, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 5, 6, 7],
  [0, 1, 2, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 7, 8],
  [0, 1, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 6, 7, 8],
  [0, 1, 2, 5, 6, 7, 8],
  [0, 2, 3, 4, 5, 6, 8],
  [0, 1, 2, 3, 4, 6, 8],
  [0, 2, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 6, 9],
  [0, 2, 3, 4, 5, 6, 9],
  [0, 1, 3, 4, 5, 6, 8],
  [0, 2, 3, 4, 5, 7, 8],
  [0, 1, 2, 3, 4, 7, 9],
  [0, 1, 2, 4, 5, 6, 8],
  [0, 2, 3, 4, 6, 7, 8],
  [0, 1, 2, 3, 5, 7, 8],
  [0, 1, 3, 5, 6, 7, 8],
  [0, 1, 2, 4, 6, 7, 8],
  [0, 1, 2, 3, 5, 6, 9],
  [0, 1, 3, 4, 5, 6, 9],
  [0, 1, 2, 4, 5, 6, 9],
  [0, 1, 4, 5, 6, 7, 9],
  [0, 2, 3, 4, 5, 8, 9],
  [0, 1, 2, 3, 6, 7, 9],
  [0, 1, 2, 3, 6, 8, 9],
  [0, 1, 2, 5, 6, 7, 9],
  [0, 2, 3, 4, 7, 8, 9],
  [0, 1, 2, 4, 5, 8, 9],
  [0, 1, 3, 4, 5, 8, 9],
  [0, 1, 2, 5, 6, 8, 9],
  [0, 2, 3, 4, 5, 7, 9],
  [0, 2, 4, 5, 6, 7, 9],
  [0, 1, 2, 3, 5, 7, 9],
  [0, 2, 4, 6, 7, 8, 9],
  [0, 2, 3, 4, 6, 7, 9],
  [0, 2, 3, 5, 6, 7, 9],
  [0, 1, 3, 4, 5, 7, 9],
  [0, 2, 4, 5, 6, 8, 9],
  [0, 1, 2, 4, 5, 7, 9],
  [0, 2, 4, 5, 7, 8, 9],
  [0, 1, 3, 5, 6, 7, 9],
  [0, 2, 3, 4, 6, 8, 9],
  [0, 1, 2, 4, 6, 7, 9],
  [0, 2, 3, 5, 7, 8, 9],
  [0, 1, 2, 4, 6, 8, 9],
  [0, 1, 3, 5, 7, 8, 9],
  [0, 1, 3, 4, 6, 7, 9],
  [0, 2, 3, 5, 6, 8, 9],
  [0, 1, 3, 4, 6, 8, 9],
  [0, 1, 3, 5, 6, 8, 9],
  [0, 1, 2, 4, 6, 8, 10],
  [0, 1, 3, 4, 6, 8, 10],
  [0, 1, 3, 5, 6, 8, 10],
  [0, 1, 2, 3, 5, 6, 8],
  [0, 2, 3, 5, 6, 7, 8],
  [0, 1, 3, 4, 5, 7, 8],
  [0, 1, 2, 4, 5, 7, 8],
  [0, 1, 3, 4, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 8],
  [0, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 9],
  [0, 1, 2, 3, 4, 5, 7, 8],
  [0, 1, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 6, 7, 8],
  [0, 1, 2, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 8, 9],
  [0, 1, 2, 3, 4, 7, 8, 9],
  [0, 1, 2, 3, 6, 7, 8, 9],
  [0, 2, 3, 4, 5, 6, 7, 9],
  [0, 1, 2, 3, 4, 5, 7, 9],
  [0, 2, 4, 5, 6, 7, 8, 9],
  [0, 1, 3, 4, 5, 6, 7, 9],
  [0, 2, 3, 4, 5, 6, 8, 9],
  [0, 1, 2, 3, 4, 6, 7, 9],
  [0, 2, 3, 5, 6, 7, 8, 9],
  [0, 1, 2, 4, 5, 6, 7, 9],
  [0, 2, 3, 4, 5, 7, 8, 9],
  [0, 1, 2, 3, 4, 6, 8, 9],
  [0, 1, 3, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 5, 7, 8, 9],
  [0, 1, 2, 4, 6, 7, 8, 9],
  [0, 1, 3, 4, 5, 6, 8, 9],
  [0, 1, 2, 3, 5, 6, 8, 9],
  [0, 1, 3, 4, 6, 7, 8, 9],
  [0, 1, 2, 4, 5, 6, 8, 9],
  [0, 1, 3, 4, 5, 7, 8, 9],
  [0, 1, 2, 4, 5, 7, 8, 9],
  [0, 1, 2, 3, 4, 6, 8, 10],
  [0, 1, 2, 3, 5, 6, 8, 10],
  [0, 1, 3, 4, 5, 6, 8, 10],
  [0, 1, 2, 3, 5, 7, 8, 10],
  [0, 1, 2, 4, 5, 6, 8, 10],
  [0, 1, 2, 4, 6, 7, 8, 10],
  [0, 1, 3, 4, 5, 7, 8, 10],
  [0, 1, 2, 4, 5, 7, 8, 10],
  [0, 1, 3, 4, 6, 7, 8, 10],
  [0, 1, 3, 4, 6, 7, 9, 10],
  [0, 1, 2, 3, 5, 6, 7, 9],
  [0, 2, 3, 4, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7, 9],
  [0, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 8, 9],
  [0, 1, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 7, 8, 9],
  [0, 1, 2, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 6, 7, 8, 9],
  [0, 1, 2, 3, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 8, 10],
  [0, 1, 2, 3, 4, 5, 7, 8, 10],
  [0, 1, 3, 4, 5, 6, 7, 8, 10],
  [0, 1, 2, 3, 4, 6, 7, 8, 10],
  [0, 1, 2, 4, 5, 6, 7, 8, 10],
  [0, 1, 2, 3, 5, 6, 7, 8, 10],
  [0, 1, 2, 3, 4, 6, 7, 9, 10],
  [0, 1, 2, 3, 5, 6, 7, 9, 10],
  [0, 1, 2, 4, 5, 6, 7, 9, 10],
  [0, 1, 2, 4, 5, 6, 8, 9, 10],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 10],
  [0, 1, 2, 3, 4, 5, 6, 7, 9, 10],
  [0, 1, 2, 3, 4, 5, 6, 8, 9, 10],
  [0, 1, 2, 3, 4, 5, 7, 8, 9, 10],
  [0, 1, 2, 3, 4, 6, 7, 8, 9, 10],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
];
const rng = seedrandom("chord-shapes");
function randomIntFromInterval(min, max) {
  return Math.floor(rng() * (max - min + 1) + min);
}

describe.each(normalForms)("shapes for pitches %s", (...inputPitchClasses) => {
  const tranposition = randomIntFromInterval(0, 11);
  inputPitchClasses = inputPitchClasses.map((p) => (p + tranposition) % 12);
  if (inputPitchClasses.length < inputPitchClasses.length) return;
  const stringPitches = [4, 9, 14, 19, 23, 28];
  const maxIntervalBetweenPitches = 12;
  const maxFretSpan = 4;
  const fretCount = 20;
  const doublings = false;
  const result = getShapes(
    inputPitchClasses,
    stringPitches,
    fretCount,
    maxFretSpan,
    maxIntervalBetweenPitches,
    4,
    doublings
  );
  const frets = result.map((obj) => obj["frets"]);

  const shapePitches = frets.map((shape) =>
    shape
      .map((p, i) => (p != "x" ? p + stringPitches[i] : "x"))
      .filter((p) => p != "x")
  );

  const shapePitchClasses = frets.map((shape) =>
    shape
      .map((p, i) => (p != "x" ? (p + stringPitches[i]) % 12 : "x"))
      .filter((p) => p != "x")
  );

  const shapePCSets = shapePitchClasses.map(
    (shapePitchClass) => new Set(shapePitchClass)
  );

  const inputPCSet = new Set(inputPitchClasses);

  test("have no duplicate shapes", () => {
    expect(new Set(frets).size).toBe(frets.length);
  });

  test("dont exceed max fret span", () => {
    for (let shape of frets) {
      const frets = shape.filter((p) => p != "x" && p != 0);
      expect(Math.max(...frets) - Math.min(...frets)).toBeLessThanOrEqual(
        maxFretSpan
      );
    }
  });

  test("have all input pitch classes", () => {
    for (const pcSet of shapePCSets) {
      expect(pcSet).toEqual(inputPCSet);
    }
  });

  test("dont have doublings", () => {
    for (let i = 0; i < frets.length; i++) {
      expect(shapePitchClasses[i].length).toEqual(shapePCSets[i].size);
    }
  });

  test("adjacent pitches dont exceed max interval", () => {
    for (let pitches of shapePitches) {
      for (let i = 0; i < pitches.length - 1; i++) {
        expect(pitches[i + 1] - pitches[i]).toBeLessThanOrEqual(
          maxIntervalBetweenPitches
        );
      }
    }
  });
});

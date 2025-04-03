function getShapes(
  pitches,
  strings,
  fretAmount,
  maxFretSpan,
  maxIntervalBetweenPitches = 12,
  fretboardFingers = 4,
  doublings = false,
  bass = null
) {
  // we only take into account pitch classes
  const inputPitches = pitches.map((pitch) => pitch % 12);

  // find starting frets
  let lowPitch = strings[0];
  let highPitch = strings[0] + fretAmount;
  let shapePitches = [["x"]].concat(
    findContainedPitches(lowPitch, highPitch, inputPitches).map((pitch) => [
      pitch,
    ])
  );

  // for each string, find next fret whose pitch is in input pitches and is reachable
  for (let stringPitch of strings.slice(1)) {
    const newShapePitches = [];
    for (let pitches of shapePitches) {
      let lowFretStringPitch = stringPitch;
      let lowFret = null;
      let highFret = null;
      let highFretStringPitch = stringPitch;
      // find lowest and highest reachable fret
      for (let stringIdx = 0; stringIdx < pitches.length; stringIdx++) {
        if (pitches[stringIdx] == "x") continue;
        // find lowest and highest used fret
        let fret = pitches[stringIdx] - strings[stringIdx];
        if (fret == 0) {
          continue;
        }
        let stringPitch = strings[stringIdx];
        if (fret < lowFret || lowFret == null) {
          lowFret = fret;
          lowFretStringPitch = stringPitch;
        }
        if (fret > highFret || highFret == null) {
          highFret = fret;
          highFretStringPitch = stringPitch;
        }
      }
      // find reachable pitches at both ends
      let lowReachFret = Math.max(highFret - maxFretSpan, 1);
      let lowReachPitch = stringPitch + lowReachFret;
      let highReachFret = Math.min(lowFret + maxFretSpan, fretAmount);
      const fretAmountToCheck =
        highFret != null ? highReachFret - lowReachFret : fretAmount;

      const nextPitches = ["x"];

      for (let i = 0; i < fretAmountToCheck; i++) {
        if (inputPitches.includes((lowReachPitch + i) % 12)) {
          nextPitches.push(stringPitch + lowReachFret + i);
        }
      }

      // add open string if pitch is part of set
      if (inputPitches.includes(stringPitch % 12)) {
        nextPitches.splice(0, 0, stringPitch);
      }

      if (nextPitches.length === 0) {
        newShapePitches.push(pitches.concat(["x"]));
      } else {
        for (let j = 0; j < nextPitches.length; j++) {
          newShapePitches.push(pitches.concat(nextPitches[j]));
        }
      }
      shapePitches = newShapePitches;
    }
  }

  // filter by bass
  if (bass !== null) {
    if (typeof bass === "number") {
      bass = [bass];
    }
    shapePitches = shapePitches.filter((shape) =>
      bass.includes(Math.min(...shape.filter((pitch) => pitch !== "x")) % 12)
    );
  }

  // filter incomplete set
  const pcSets = shapePitches.map(
    (shape) =>
      new Set(shape.filter((pitch) => pitch !== "x").map((pitch) => pitch % 12))
  );
  const pitchAmount = new Set(inputPitches).size;
  let idxToRemove = [];

  for (let i = 0; i < pcSets.length; i++) {
    if (pcSets[i].size < pitchAmount) {
      idxToRemove.push(i);
    }
  }
  shapePitches = shapePitches.filter(
    (shape, idx) => !idxToRemove.includes(idx)
  );

  if (!doublings) {
    // remove doublings
    for (let i = 0; i < shapePitches.length; i++) {
      const pitchSet = new Set();
      const toRemove = [];
      for (let j = 0; j < shapePitches[i].length; j++) {
        let pitch = shapePitches[i][j];
        if (pitch === "x") {
          continue;
        }
        if (pitchSet.has(pitch % 12)) {
          toRemove.push(j);
        } else {
          pitchSet.add(pitch % 12);
        }
      }

      for (let j = 0; j < toRemove.length; j++) {
        shapePitches[i][toRemove[j]] = "x";
      }
    }

    // remove duplicate shapes
    const uniqueShapes = new Set(
      shapePitches.map((shape) => JSON.stringify(shape))
    );
    shapePitches = Array.from(uniqueShapes).map((shape) => JSON.parse(shape));
  }

  // filter by maximum interval between adjacent pitches
  idxToRemove = [];
  shapePitches
    .map((shape) => shape.filter((pitch) => pitch !== "x"))
    .map((pitch, idx) => {
      for (let i = 1; i < pitch.length; i++) {
        let interval = pitch[i] - pitch[i - 1];
        if (Math.abs(interval) > maxIntervalBetweenPitches) {
          idxToRemove.push(idx);
        }
      }
      return pitch;
    });
  shapePitches = shapePitches.filter(
    (shape, idx) => !idxToRemove.includes(idx)
  );

  // TODO:remove chords that only differ by doublings
  // if plucked:
  // more open strings have preference
  // less fret span has preference
  // if strummed:
  // more open strings have preference

  // pitches to frets
  for (let i = 0; i < shapePitches.length; i++) {
    for (let j = 0; j < shapePitches[i].length; j++) {
      if (shapePitches[i][j] != "x") {
        shapePitches[i][j] = shapePitches[i][j] - strings[j];
      }
    }
  }

  // remove shapes duplicated at the octave
  idxToRemove = [];
  for (let i = 0; i < shapePitches.length; i++) {
    let keep = false;
    for (let j = 0; j < shapePitches[i].length; j++) {
      if (shapePitches[i][j] < 12) {
        keep = true;
        break;
      }
    }
    keep ? null : idxToRemove.push(i);
  }

  shapePitches = shapePitches.filter(
    (shape, idx) => !idxToRemove.includes(idx)
  );

  shapePitches = shapePitches.map((shape) => {
    return { frets: shape, barres: [] };
  });

  const finalShapes = [];
  for (let shape of shapePitches) {
    const frets = shape["frets"].filter((pitch) => pitch !== "x");
    if (frets.filter((f) => f !== 0 && f !== "x").length <= fretboardFingers) {
      finalShapes.push(shape);
    } else {
      // count ocurrences of each fret
      const counts = {};
      frets.forEach((x) => {
        if (counts[x]) {
          counts[x]++;
        } else {
          counts[x] = 1;
        }
      });
      if (Object.keys(counts).length < fretboardFingers) {
        // put first barre on most common fret
        let mostCommonFret = null;
        let mostCommonFretCount = 0;
        for (const [fret, count] of Object.entries(counts)) {
          if (count > mostCommonFretCount) {
            mostCommonFret = fret;
            mostCommonFretCount = count;
          }
        }
        let barreStart = null;
        let barreEnd = strings.length;
        for (let i = 0; i < frets.length; i++) {
          if (frets[i] == mostCommonFret) {
            if (!barreStart) {
              barreStart = i + 1;
            }
          }
        }

        // check if barre obstructs necessary frets
        const obstructedFrets = shape["frets"].map((fret, stringIdx) => {
          if (
            fret != "x" &&
            fret < mostCommonFret &&
            stringIdx > barreStart - 1 &&
            stringIdx <= barreEnd - 1
          ) {
            return true;
          } else {
            return false;
          }
        });
        const remainingPitchClasses = frets
          .filter((fret, i) => !obstructedFrets[i] && fret != "x")
          .map((pitch, i) => (pitch + strings[i]) % 12);

        const remainingPCSet = new Set(remainingPitchClasses);
        if (remainingPCSet.size == pitchAmount) {
          shape["barres"].push({
            fromString: barreStart,
            toString: barreEnd,
            fret: mostCommonFret,
          });
          finalShapes.push(shape);
        }
      }
    }
  }
  return finalShapes;
}

function findContainedPitches(start, end, pitches) {
  let containedPitches = [];
  for (let i = start; i <= end; i++) {
    if (pitches.map((pitch) => pitch % 12).includes(i % 12)) {
      containedPitches.push(i);
    }
  }
  return containedPitches;
}

export { getShapes };

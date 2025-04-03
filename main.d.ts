  interface Barre {
    fromString: number;
    toString: number;
    fret: number;
  }

  interface Shape {
    frets: number[];
    barres: Barre[];
  }
  
  declare function getShapes(
    pitches: number[],
    strings: number[],
    fretAmount: number,
    maxFretSpan: number,
    maxIntervalBetweenPitches?: number,
    fretboardFingers?: number,
    doublings?: boolean,
    bass?: null,
  ): Shape[];

  export { getShapes, Shape };
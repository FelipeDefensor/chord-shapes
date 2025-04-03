# chord-shapes

Generate all playable shapes for any set of notes on any stringed instrument. This can be useful for:

- Generating chord diagrams
- Checking if certains chords are playable in a given instrument
- Creating alternate tunings
- Algorithmic composition

# Installation

```
npm i chord-shapes
```

# Usage

```
import { getShapes } from "chord-shapes";

const pitches = [0, 4, 7]; // C Major triad (C, E, G). Notes are passed as pitch integers
const strings = [4, 9, 14, 19, 23, 28]; // Standard guitar tuning, in pitches
const fretAmount = 18;
const maxFretSpan = 4; // Limits the shape to a playable hand span (e.g., avoids extreme stretches)

const shapes = getShapes(pitches, strings, fretAmount, maxFretSpan);

// OUTPUT
// { frets: [ 'x', 'x', 'x', 0, 1, 0 ], barres: [] }
// { frets: [ 'x', 'x', 'x', 0, 5, 8 ], barres: [] }
// { frets: [ 'x', 'x', 'x', 5, 5, 3 ], barres: [] }
// { frets: [ 'x', 'x', 'x', 5, 8, 0 ], barres: [] }
// { frets: [ 'x', 'x', 'x', 9, 8, 8 ], barres: [] }
// ...
```

There are usually hundreds of shapes for a set of notes. We can filter or expand the results by passing the following argument to `getShapes`. The given values are the defaults

```
const maxIntervalBetweenPitches = 12; // Maximum interval between consecutive pitches.
const fretboardFingers = 5; // How many fingers are available to press frets. Only one finger is required to play a barre.
const doublings = true; // If false, exclude shapes the same pitches doubled at the octave or at the unison.
const bass = null; // If provided, exclude shapes whose lowest pitch-class does not match it. Can be an integer or a list of integers.
```

# Caveats

- `strings` are expected to be in ascending order. Output may be wrong otherwise.
- `pitches` are converted to pitch-classes before searching for shapes. That means it is not possible to only search for chords that have doublings at the unison or at the octave.
- The constraint from `fretboardFingers` may exclude chords playable by strumming. Pass `fretboardFingers=Infinity` as a workaround.
- Chords that are only playble by using two barres are excluded from result. Pass `fretboardFingers=Infinity` as a workaround.
- Some other constraints that make that may make chords very hard to play or unplayable are not enforced. For instance, for the shape `[11,15,14,15,x,x]` is listed in the output for `pitches=[1,3,4,9]` and `strings=[4,9,14,19,23,28] //guitar strings` even though in some instruments it might be virtually impossible to play due to the body getting in the way.

# Test

```
npm test
```

Note that the the test suite might take several minutes to run as it runs `getShapes` for every possible pitch set class once. PRs with improvements to this approach are welcome.

# Contribute

PRs are welcome, especially ones that deal with the caveats listed above. Testing the output of `getShapes` to ensure the chords are actually playable in a real instrument is also of great help.

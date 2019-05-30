/*  Warm up starting at 2 pitches + 2 notes
    and ending at 5 pitches + 3 notes
    Steps:
    1: 2 pitches, 2 notes (this should be hardcoded)
    2: 2, 2 (this should be hardcoded)
    3: 3, 2 (last note hardcoded to new)
    4: 3, 3 (first note hardcoded to new)
    5: 3, 3
    6: 3, 3
    7: 3, 3
    8: 4, 2 (last note hardcoded to new)
    9: 4, 3 (first note hardcoded to new)
    10: 4, 3
    11: 4, 3
    12: 4, 3
    13: 4, 3
    14: 5, 2 (l)
    15: 5, 3 (f)
    16: 5, 3
**/

export default class Warmup {
    constructor() {
        // put these values to init.js, initiate the object and set it from the outside
        this.fixedLevels = [1, 2, 3, 4, 8, 9, 14, 15];
          // const forcedWarmupSequence = (warmupLevel > 0 && warmupLevel < 5) ||
        //     warmupLevel === 8 || warmupLevel === 9 || (warmupLevel >= 14 && warmupLevel < 21);
    }

    get active() {
        return this._active;
    }
    set active(newValue) {
        this._active = newValue;
    }
    hasFixedNotes(level) {
        return this.fixedLevels.indexOf(level) !== -1;
    }
    insertFixedNotes(level, sequence) {
        switch (level) {
            case 1:
                sequence = [{ noteIndex: 3, length: 4 }, { noteIndex: 4, length: 4 }];
                break;
            case 2:
                sequence = [{ noteIndex: 4, length: 4 }, { noteIndex: 3, length: 4 }];
                break;
            case 3:
                sequence[sequence.length - 1] = { noteIndex: 0, length: 4 };
                break;
            case 4:
                sequence[0] = { noteIndex: 0, length: 4 };
                break;
            case 8:
                sequence[sequence.length - 1] = { noteIndex: 2, length: 4 };
                break;
            case 9:
                sequence[0] = { noteIndex: 2, length: 4 };
                break;
            case 14:
                sequence[sequence.length - 1] = { noteIndex: 1, length: 4 };
                break;
            case 15:
                sequence[0] = { noteIndex: 1, length: 4 };
                break;
        }
        return sequence;
    }
    getPitchArray(level) {
        let pitchArray;
        if (1 <= level && level < 3) {
            pitchArray = [3, 4];
        } else if (3 <= level && level < 8) {
            pitchArray = [3, 4, 0];
        } else if (8 <= level && level < 14) {
            pitchArray = [3, 4, 0, 2];
        } else {
            pitchArray = [3, 4, 0, 2, 1];
        }
        return pitchArray;
    }
    getNumberOfNotes(level) {
        let numberOfNotes;
        if ((1 <= level && level < 3) || (level === 8 || level === 14)) {
            numberOfNotes = 2;
        } else {
            numberOfNotes = 3;
        }
        return numberOfNotes;
    } 
}
import '@polymer/polymer/lib/utils/boot.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

let PiePlayerMixinInternal = (superClass) => {
    return class extends superClass {
        constructor() {
            super();
        }
        static get properties() {
            return {
                playback: {
                    type: Boolean,
                    value: false,
                    notify: true,
                    observer: 'onPlaybackChanged'
                },
                scheduledNotes: {
                    type: Array,
                    value: () => []
                },
                /**
                 * The list of the sound files.
                 */
                sampleList: {
                    type: Array,
                    value: [
                        'assets/sounds/piano-1.mp3',
                        'assets/sounds/piano-2.mp3',
                        'assets/sounds/piano-3.mp3',
                        'assets/sounds/piano-4.mp3',
                        'assets/sounds/piano-5.mp3',
                    ]
                },
                /**
                  * Whether it's the last note playing in the bot sequence
                  */
                lastBotNote: Boolean,
                /**
                  * Indicates if user has heard more than one note.
                  * Used to avoid the user constantly stopping playback and
                  * trying out the notes without loosing score.
                  */
                userStoppedPlaybackAfterHearingMultipleNotes: Boolean
            }
        }
        startPlayback() {
            this.preparePlayback();
            this.runPlayback();
        }
        preparePlayback() {
            this.scheduledNotes.forEach((note, index) => {
                note.media = new Media(this.sampleList[note.note], null, null, (status) => {
                    if (status === 4) {
                        this.scheduledNotes[index].media.release();
                        this.scheduledNotes[index].media = null;
                        if (this.scheduledNotes[index].isLastNote) {
                            this.lastBotNote = false;
                            this.playback = false;
                        }
                    }
                });
                note.intendedLength = this.computeSecondsForNoteLength(note);
                note.isLastNote = (index === this.scheduledNotes.length - 1);
            });
        }
        runPlayback() {
            const notesPlayed = [];
            const mediaInstances = this.scheduledNotes.map(note => note.media);

            // Duplicate the array ahead of the loop
            const scheduledNotes = this.scheduledNotes.slice(0);
            let currentIndex = 0;
            this.playBotSound(currentIndex);

            // Keep track of iterations to avoid play triggering twice
            let iterationSinceLastPlay = 0;
            this.intervalId = setInterval(() => {
                mediaInstances[currentIndex].getCurrentPosition((position) => {
                    iterationSinceLastPlay += 1;
                    if (position === -1 || iterationSinceLastPlay <= 5) {
                        return;
                    }
                    if (scheduledNotes[currentIndex].intendedLength - position < 0.005) {
                        currentIndex++;
                        // Last note has played, stop the loop
                        if (currentIndex === scheduledNotes.length) {
                            clearInterval(this.intervalId);
                            return;
                        }
                        this.playBotSound(currentIndex);
                        iterationSinceLastPlay = 0
                    }
                });
            }, 5);
        }
        computeSecondsForNoteLength(note) {
            const lengthMap = {
                2: 0.46,
                4: 0.92
            }
            return lengthMap[note.length];
        }
        playBotSound(noteIndex) {
            const note = this.scheduledNotes[noteIndex];
            const mediaInstance = note.media;
            mediaInstance.play();
            this.lastBotNote = note.isLastNote;

            // PlaybackIndex controls the visibilty of note bars.
            // Only animate during the first playback
            if (this.playbackIndex !== this.scheduledNotes.length - 1) {
                this.playbackIndex = noteIndex;
            }
        }
        playUserSound(noteIndex) {
            const media = new Media(this.sampleList[noteIndex], null);
            media.play();
        }
        onPlaybackChanged(newValue, oldValue) {
            // Stop playback
            if (oldValue && !newValue) {
                clearInterval(this.intervalId);
                const activeSounds = this.scheduledNotes.map(note => note.media).filter(media => media);
                const fadeOutIntervals = [];
                const volumeDecreaseCounters = [];

                // Fade out bot sounds
                // Decrease volume in interval and store interval reference
                activeSounds.forEach((activeSound, i) => {
                    volumeDecreaseCounters[i] = 0;
                    fadeOutIntervals[i] = setInterval(() => {
                        volumeDecreaseCounters[i] += 1;
                        // Stop if it would set the volume negative
                        if (volumeDecreaseCounters[i] > 20) {
                            return;
                        }
                        activeSound.setVolume(1 - (volumeDecreaseCounters[i] * 0.05));
                    }, 5);
                });

                // Release bot sounds
                setTimeout(() => {                   
                    for (var k = 0; k < fadeOutIntervals.length; k++) {
                        clearInterval(fadeOutIntervals[k]);
                    }
                    fadeOutIntervals.splice(0, fadeOutIntervals.length);
                    volumeDecreaseCounters.splice(0, volumeDecreaseCounters.length);

                    for (var l = 0; l < activeSounds.length; l++) {
                        activeSounds[l].release();
                    }
                }, 120);

                // If playback hasn't completed at least once, reset the playbackIndex
                if (this.playbackIndex < this.scheduledNotes.length - 1) {
                    // User has already played a note when bot melody was generated, but not
                    // fully displayed, and now they are stopping playback again
                    if (this.playbackIndex > 0) {
                        this.userStoppedPlaybackAfterHearingMultipleNotes = true;
                    }
                    this.playbackIndex = -1;
                }

            }
        }
    }
};
export const PiePlayerMixin = dedupingMixin(PiePlayerMixinInternal);

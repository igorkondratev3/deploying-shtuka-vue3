import { defineStore } from 'pinia';

export const theoryNotesCollection = defineStore({
  id: 'theoryNotesCollection',
  state: () => ({
    circle1: {
      grade7: {},
      grade8: {},
      grade9: {},
    },
    circle2: {
      grade9: {},
      grade10: {},
      grade11: {},
    },
  }),
  actions: {
    setTheoryNotes(theoryNotes) {
      this[`circle${theoryNotes[0].circle}`][`grade${theoryNotes[0].grade}`][
        `lesson${theoryNotes[0].lesson}`
      ] = theoryNotes;
    },
    setTheoryNote(theoryNote) {
      if (theoryNote) {
        const notes =
          this[`circle${theoryNote.circle}`][`grade${theoryNote.grade}`][
            `lesson${theoryNote.lesson}`
          ];
        if (notes) notes.push(theoryNote);
        else
          this[`circle${theoryNote.circle}`][`grade${theoryNote.grade}`][
            `lesson${theoryNote.lesson}`
          ] = [theoryNote];
      }
    },
    deleteTheoryNote(theoryNote) {
      const notes =
        this[`circle${theoryNote.circle}`][`grade${theoryNote.grade}`][
          `lesson${theoryNote.lesson}`
        ];
      notes.splice(
        notes.findIndex((note) => note._id == theoryNote._id),
        1
      );
    },
    editTheoryNote(currentTheoryNote) {
      const theoryNotes =
        this[`circle${currentTheoryNote.circle}`][
          `grade${currentTheoryNote.grade}`
        ][`lesson${currentTheoryNote.lesson}`];
      const theoryNote = theoryNotes.find(
        (theoryNote) => theoryNote._id === currentTheoryNote._id
      );
      theoryNote.textStyle = currentTheoryNote.textStyle;
      theoryNote.text = currentTheoryNote.text;
    },
    clearTheoryNotes() {
      this.circle1.grade7 = {};
      this.circle1.grade8 = {};
      this.circle1.grade9 = {};
      this.circle2.grade9 = {};
      this.circle2.grade10 = {};
      this.circle2.grade11 = {};
    },
  },
});

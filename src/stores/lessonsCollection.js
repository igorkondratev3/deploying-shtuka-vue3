import { defineStore } from 'pinia';

export const lessonsCollection = defineStore({
  id: 'lessonsCollection',
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

    numberOf: {
      grade7Lessons: 50,
      grade8Lessons: 62,
      circle1Grade9Lessons: 20,
      circle2Grade9Lessons: 18,
      grade10Lessons: 5,
      grade11Lessons: 6,
    },

    isFull: {
      circle1Grade7: false,
      circle1Grade8: false,
      circle1Grade9: false,
      circle2Grade9: false,
      circle2Grade10: false,
      circle2Grade11: false,
    },
  }),
  actions: {
    setLesson(lesson) {
      if (lesson)
        this[`circle${lesson.circle}`][`grade${lesson.grade}`][
          `lesson${lesson.lesson}`
        ] = lesson;
    },
    setLessons(lessons) {
      for (let lesson of lessons) {
        this[`circle${lesson.circle}`][`grade${lesson.grade}`][
          `lesson${lesson.lesson}`
        ] = lesson;
      }
      this.isFull[`circle${lessons[0].circle}grade${lessons[0].grade}`] = true;
    },
    isThereLesson(circleNumber, gradeNumber, lessonNumber) {
      if (
        this[`circle${circleNumber}`][`grade${gradeNumber}`][
          `lesson${lessonNumber}`
        ]
      )
        return true;
      else return false;
    },
  },
});

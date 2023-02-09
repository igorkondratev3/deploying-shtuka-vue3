import { defineStore } from 'pinia';

export const lessonNum = defineStore({
  id: 'lessonNum',
  state: () => ({
    circleNumber: 0,
    gradeNumber: 0,
    lessonNumber: 0,
  }),
  getters: {
    circle: (state) => 'circle' + state.circleNumber,
    grade: (state) => 'grade' + state.gradeNumber,
    lesson: (state) => 'lesson' + state.lessonNumber,
    theoryComponentName: (state) =>
      `Circle${state.circleNumber}Lesson${state.lessonNumber}`,
  },
  actions: {
    changeLessonNumber(circleNumber, gradeNumber, lessonNumber) {
      this.circleNumber = circleNumber;
      this.gradeNumber = gradeNumber;
      this.lessonNumber = lessonNumber;
      localStorage.setItem(
        'lesson',
        JSON.stringify({ circleNumber, lessonNumber, gradeNumber })
      );
    },
  },
});

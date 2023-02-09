export const goToChoosenLesson = (
  circleNumber,
  gradeNumber,
  lessonNumber,
  storeLessonNum,
  router
) => {
  storeLessonNum.changeLessonNumber(circleNumber, gradeNumber, lessonNumber);
  router.push({ path: '/lessonLayout' });
};

<script setup>
  import LessonsHeader from './components/header/lessonsHeader.vue';
  import LeesonMain from './components/main/lessonMain.vue';
  import LessonsFooter from './components/footer/lessonsFooter.vue';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue'
  import { watch, onMounted, onBeforeUnmount, ref, provide } from 'vue';
  import { getLesson } from '../generalFunctions/requestsToBackend.js';
  import {
    calculateLessonNumberForPreviousLesson,
    calculateLessonNumberForNextLesson,
  } from '../generalFunctions/calculateLessonNumber.js';
  import { changeLesson } from '@/views/generalFunctions/changeLesson.js';
  import { lessonsCollection } from '../../stores/lessonsCollection.js';
  import { lessonNum } from '../../stores/lessonNum.js';
  import { changeCanChangeLessonSymbol } from '@/views/lessons/symbols.js';

  const storeLessonsCollection = lessonsCollection();
  const storeLessonNum = lessonNum();

  const error = ref('');

  const canChangeLesson = ref(true);
  const changeCanChangeLesson = (value) => (canChangeLesson.value = value);
  provide(changeCanChangeLessonSymbol, changeCanChangeLesson);

  if (!localStorage.lesson) storeLessonNum.changeLessonNumber(1, 7, 1);
  //на случай если загружается страница урока напрямую и если раньше не был на сайте

  setLesson(
    storeLessonNum.circleNumber,
    storeLessonNum.gradeNumber,
    storeLessonNum.lessonNumber
  );
  setLesson(
    ...calculateLessonNumberForPreviousLesson(
      storeLessonNum,
      storeLessonsCollection.numberOf
    )
  );
  setLesson(
    ...calculateLessonNumberForNextLesson(
      storeLessonNum,
      storeLessonsCollection.numberOf
    )
  );

  watch(storeLessonNum, () => {
    setLesson(
      storeLessonNum.circleNumber,
      storeLessonNum.gradeNumber,
      storeLessonNum.lessonNumber
    );
    setLesson(
      ...calculateLessonNumberForPreviousLesson(
        storeLessonNum,
        storeLessonsCollection.numberOf
      )
    );
    setLesson(
      ...calculateLessonNumberForNextLesson(
        storeLessonNum,
        storeLessonsCollection.numberOf
      )
    );
  });

  async function setLesson(circleNumber, gradeNumber, lessonNumber) {
    if (
      !storeLessonsCollection.isThereLesson(
        circleNumber,
        gradeNumber,
        lessonNumber
      )
    ) {
      const lesson = await getLesson(circleNumber, gradeNumber, lessonNumber);
      if (lesson.error) {
        error.value = lesson.error;
        return;
      }
      storeLessonsCollection.setLesson(lesson);
    }
  }

  const handleChangeLesson = (event) => {
    if (
      event.code === 'ArrowLeft' &&
      event.altKey &&
      event.shiftKey &&
      canChangeLesson.value
    )
      changeLesson(calculateLessonNumberForPreviousLesson);

    if (
      event.code === 'ArrowRight' &&
      event.altKey &&
      event.shiftKey &&
      canChangeLesson.value
    )
      changeLesson(calculateLessonNumberForNextLesson);
  };

  onMounted(() => {
    document.addEventListener('keydown', handleChangeLesson);
  });
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleChangeLesson);
  });
</script>

<template>
  <div class="lesson-layout">
    <LessonsHeader />
    <ErrorVue
      class="lesson-layout__error"
      v-if="error"
      :error="error"
      @closeError="error = ''"
    />
    <LeesonMain />
    <LessonsFooter />
  </div>
</template>

<style>
  .lesson-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
  }

  .lesson-layout__error {
    align-self: center;
  }
</style>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { changeColor } from '@/views/generalFunctions/changeColor.js';
  import {
    calculateLessonNumberForNextLesson,
    calculateLessonNumberForPreviousLesson,
  } from '@/views/generalFunctions/calculateLessonNumber.js';
  import { drawArrowRight, drawArrowLeft } from './functions.js';
  import { changeLesson } from '@/views/generalFunctions/changeLesson.js';
  import { lessonsCollection } from '@/stores/lessonsCollection';
  import { lessonNum } from '@/stores/lessonNum.js';

  const props = defineProps({ where: String });
  let drawArrow;
  let calculateLessonNumber;

  if (props.where === 'next') {
    drawArrow = drawArrowRight;
    calculateLessonNumber = calculateLessonNumberForNextLesson;
  }

  if (props.where === 'previous') {
    drawArrow = drawArrowLeft;
    calculateLessonNumber = calculateLessonNumberForPreviousLesson;
  }

  const storeLessonsCollection = lessonsCollection();
  const storeLessonNum = lessonNum();
  const areaForArrow = ref(null);
  const lessonButton = ref(null);

  onMounted(() => {
    changeColor(lessonButton.value);
    drawArrow(areaForArrow.value.getContext('2d'));
  });

  const lessonTitle = computed(() => {
    const [circleNumber, gradeNumber, lessonNumber] = calculateLessonNumber(
      storeLessonNum,
      storeLessonsCollection.numberOf
    );

    let headings =
      storeLessonsCollection['circle' + circleNumber]['grade' + gradeNumber][
        'lesson' + lessonNumber
      ]?.headings;

    let title = '';
    if (headings) {
      for (let head of headings) {
        title = title + head + ' ';
      }
    }
    if (props.where === 'next') {
      title = title + '(alt+shift+right)';
    }
    if (props.where === 'previous') {
      title = title + '(alt+shift+left)';
    }
    return title;
  });
</script>

<template>
  <button
    class="navigation__lesson-button round-button"
    ref="lessonButton"
    @click="changeLesson(calculateLessonNumber)"
    :title="lessonTitle"
  >
    <canvas
      ref="areaForArrow"
      width="32"
      height="32"
    >
    </canvas>
  </button>
</template>

<style>
  /*round-button в app.vue*/
  .navigation__lesson-button {
    border: 0;
    background-color: transparent;
  }
</style>

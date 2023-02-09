<script setup>
  import LessonsNavigation from './components/lessonsNavigation/lessonsNavigation.vue';
  import CloseLessonsList from './components/closeLessonsList.vue';
  import LessonsVue from './components/lessonsVue.vue';
  import { ref } from 'vue';
  import { lessonsCollection } from '../../stores/lessonsCollection.js';

  const storeLessonsCollection = lessonsCollection();
  const circleAndGrade = ref({
    circle: 1,
    grade: 7,
    addForNumberOfLesson: 0,
  });

  const changeCircle = (circle) => {
    circleAndGrade.value.circle = circle;
    if (circle == 1) {
      circleAndGrade.value.grade = 7;
    } else {
      circleAndGrade.value.grade = 9;
    }
    changeAddForNumberOfLesson();
  };

  const changeGrade = (grade) => {
    circleAndGrade.value.grade = grade;
    changeAddForNumberOfLesson();
  };

  const changeAddForNumberOfLesson = () => {
    switch (circleAndGrade.value.grade) {
      case 7:
        circleAndGrade.value.addForNumberOfLesson = 0;
        break;
      case 8:
        circleAndGrade.value.addForNumberOfLesson =
          storeLessonsCollection.numberOf.grade7Lessons;
        break;
      case 9:
        if (circleAndGrade.value.circle === 1) {
          circleAndGrade.value.addForNumberOfLesson =
            storeLessonsCollection.numberOf.grade7Lessons +
            storeLessonsCollection.numberOf.grade8Lessons;
        } else {
          circleAndGrade.value.addForNumberOfLesson = 0;
        }
        break;
      case 10:
        circleAndGrade.value.addForNumberOfLesson =
          storeLessonsCollection.numberOf.circle2Grade9Lessons;
        break;
      case 11:
        circleAndGrade.value.addForNumberOfLesson =
          storeLessonsCollection.numberOf.circle2Grade9Lessons +
          storeLessonsCollection.numberOf.grade10Lessons;
        break;
    }
  };
</script>

<template>
  <div class="lessons-list">
    <CloseLessonsList />
    <LessonsNavigation
      @changeCircle="changeCircle"
      @changeGrade="changeGrade"
    />
    <LessonsVue :circleAndGrade="circleAndGrade" />
  </div>
</template>

<style>
  .lessons-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgb(232, 250, 245);
    min-height: 100vh;
  }
</style>

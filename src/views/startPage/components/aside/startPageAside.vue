<script setup>
  import TitleAside from './components/titleAside.vue';
  import FirstLesson from './components/firstLesson.vue';
  import LastViewedLesson from './components/lastViewedLesson.vue';
  import LessonsList from './components/lessonsList.vue';
  import { useRouter } from 'vue-router';
  import { goToChoosenLesson } from '@/views/generalFunctions/goToChoosenLesson.js';
  import { lessonNum } from '@/stores/lessonNum.js';

  const router = useRouter();
  const storeLessonNum = lessonNum();
</script>

<template>
  <nav class="start-page__nav start-page-navigation">
    <TitleAside />
    <FirstLesson
      class="start-page-navigation__links start-links"
      @goToFirstLesson="goToChoosenLesson(1, 7, 1, storeLessonNum, router)"
    />
    <LastViewedLesson
      class="start-page-navigation__links start-links"
      @goToLastViewedLesson="
        goToChoosenLesson(
          storeLessonNum.circleNumber,
          storeLessonNum.gradeNumber,
          storeLessonNum.lessonNumber,
          storeLessonNum,
          router
        )
      "
    />
    <LessonsList class="start-page-navigation__links" />
  </nav>
</template>

<style>
  .start-page-navigation__links {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow-x: hidden;
    cursor: default;
  }

  .start-page-navigation__links:hover {
    color: black;
    background-color: rgb(48, 124, 118);
    border-radius: 30px;
  }
</style>

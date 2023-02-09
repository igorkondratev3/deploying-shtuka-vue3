<script setup>
  import { computed } from 'vue';
  import { lessonsCollection } from '@/stores/lessonsCollection.js';
  import { lessonNum } from '@/stores/lessonNum.js';

  const storeLessonsCollection = lessonsCollection();
  const storeLessonNum = lessonNum();
  const heading = computed(() => {
    return storeLessonsCollection[storeLessonNum.circle][storeLessonNum.grade][
      storeLessonNum.lesson
    ]?.headings;
  });
  const theme__value_media = computed(() => {
    return storeLessonNum.lesson;
  });
</script>

<template>
  <div class="lesson-main__theme theme">
    <h1
      class="theme__value"
      :class="theme__value_media"
      v-for="head in heading"
      :key="head.id"
    >
      {{ head }}
    </h1>
  </div>
</template>

<style>
  .lesson-main__theme {
    padding: 2px 10px;
    margin-right: 10px;
    margin-top: 5px;
    max-height: 34px;
  }

  .theme__value {
    display: inline;
    font: oblique 22px 'Times New Roman';
    text-align: left;
    font-weight: bold;
    padding: 0px 0px 2px 5px;
  }

  @media (max-width: 700px) {
    h1.lesson1:nth-child(4) {
      display: none;
    }
    h1.lesson1:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 455px) {
    h1.lesson1:nth-child(3) {
      display: none;
    }
  }

  @media (max-width: 465px) {
    h1.lesson2:nth-child(2) {
      display: none;
    }
  }
</style>

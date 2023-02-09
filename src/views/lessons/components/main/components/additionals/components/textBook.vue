<script setup>
  import { lessonsCollection } from '@/stores/lessonsCollection.js';
  import { lessonNum } from '@/stores/lessonNum.js';
  import { computed } from 'vue';

  const storeLessonsCollection = lessonsCollection();
  const storeLessonNum = lessonNum();
  const textBook = computed(() => {
    return storeLessonsCollection[storeLessonNum.circle][storeLessonNum.grade][
      storeLessonNum.lesson
    ]?.textBook;
  });
  const bookUrl = computed(() => {
    return storeLessonsCollection[storeLessonNum.circle][storeLessonNum.grade][
      storeLessonNum.lesson
    ]?.bookUrl;
  });
</script>

<template>
  <a
    class="additionals__link additionals__text-book additionals-link"
    :href="bookUrl"
    target="_blank"
  >
    <div
      class="additionals-link__content"
      :title="textBook"
    >
      Учебник
    </div>
  </a>
</template>

<style>
  /*стили в родителе*/
</style>

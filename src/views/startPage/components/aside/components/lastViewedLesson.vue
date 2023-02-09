<script setup>
  import { computed } from 'vue';

  const isThereLessonInLocalStorage = computed(() => {
    return localStorage.lesson;
  });
  defineEmits(['goToLastViewedLesson']);
</script>

<template>
  <div
    class="start-links__last-viewed-lesson"
    v-show="isThereLessonInLocalStorage"
    @click="$emit('goToLastViewedLesson')"
  >
    <img
      class="icon_large-size"
      src="/src/assets/arrow-right.svg"
    />
    Последний просмотренный урок
  </div>
</template>

<style>
  /*icon в app.vue*/
  .start-links__last-viewed-lesson {
    margin-bottom: 30px;
    overflow-y: hidden;
  }
</style>

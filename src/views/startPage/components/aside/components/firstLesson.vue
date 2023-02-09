<script setup>
  defineEmits(['goToFirstLesson']);
</script>

<template>
  <div
    class="start-links__first-lesson"
    @click="$emit('goToFirstLesson')"
  >
    <img
      class="icon_large-size"
      src="/src/assets/start.svg"
    />
    Первый урок
  </div>
</template>

<style>
  /*icon в app.vue*/
  .start-links__first-lesson {
    margin-bottom: 30px;
    overflow-y: hidden;
  }
</style>

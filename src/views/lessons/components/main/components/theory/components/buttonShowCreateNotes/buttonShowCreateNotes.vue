<script setup>
  import { ref, onMounted } from 'vue';
  import { changeColor } from '@/views/generalFunctions/changeColor.js';
  import { drawPen } from './functions.js';

  const pen = ref(null);
  const buttonShowCreateNotes = ref(null);

  onMounted(() => {
    drawPen(pen.value.getContext('2d'));
    changeColor(buttonShowCreateNotes.value);
  });
</script>

<template>
  <div
    class="lesson-theory__button-show-create-notes round-button"
    ref="buttonShowCreateNotes"
  >
    <canvas
      ref="pen"
      width="32"
      height="32"
    >
    </canvas>
  </div>
</template>

<style>
  /*round-button в app.vue*/
  .lesson-theory__button-show-create-notes {
    align-self: center;
  }
</style>

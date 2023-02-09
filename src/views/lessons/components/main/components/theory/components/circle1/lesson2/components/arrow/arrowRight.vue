<script setup>
  import { ref, onMounted } from 'vue';
  import { drawArrow } from './functions.js';

  const arrow = ref(null);

  onMounted(() => {
    drawArrow(arrow.value.getContext('2d'));
  });
</script>

<template>
  <canvas
    ref="arrow"
    width="20"
    height="10"
  >
  </canvas>
</template>

<style></style>

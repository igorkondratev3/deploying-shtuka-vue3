<script setup>
  import { ref, onMounted } from 'vue';
  import { drawLighting } from './functions.js';

  const lighting = ref(null);

  onMounted(() => {
    drawLighting(lighting.value.getContext('2d'), 0, 0);
  });
</script>

<template>
  <canvas
    ref="lighting"
    width="350"
    height="485"
  >
  </canvas>
</template>

<style></style>

<script setup>
  const props = defineProps({ aboutCircle: String });
</script>

<template>
  <div class="navigation__about-circle">
    {{ props.aboutCircle }}
  </div>
</template>

<style>
  .navigation__about-circle {
    font: normal 24px 'Times New Roman';
    text-align: center;
    white-space: pre-wrap;
    color: rgb(98, 109, 139);
    padding-top: 20px;
    margin: 0px 16px;
  }
</style>

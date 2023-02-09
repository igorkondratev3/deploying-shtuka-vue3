<script setup>
  const props = defineProps({
    error: String,
  });
  const emits = defineEmits(['closeError']);
  setTimeout(() => emits('closeError'), 5000);
</script>

<template>
  <div class="error error_border">
    {{ props.error }}
  </div>
</template>

<style>
  .error {
    text-align: center;
    padding: 10px;
    color: #e7195a;
  }

  .error_border {
    border: 1px solid #e7195a;
    border-radius: 4px;
  }
</style>

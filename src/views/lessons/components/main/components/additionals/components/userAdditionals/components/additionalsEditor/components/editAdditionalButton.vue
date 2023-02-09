<script setup>
  import { inject } from 'vue';

  const props = defineProps({
    additional: Object,
  });
  const openCreateAdditionalsForm = inject('openCreateAdditionalsForm');
</script>

<template>
  <button
    class="additionals-link editor-button"
    title="изменить"
    @click="openCreateAdditionalsForm('edit', props.additional)"
  >
    <img
      class="icon_small-size icon_edit-color"
      src="/src/assets/edit.svg"
    />
  </button>
</template>

<style></style>

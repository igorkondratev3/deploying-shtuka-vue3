<script setup>
  import CopyAdditionalButton from './components/copyAdditionalButton.vue';
  import DeleteAdditionalButton from './components/deleteAdditionalButton.vue';
  import EditAdditionalButton from './components/editAdditionalButton.vue';

  const props = defineProps({
    additional: Object,
  });
</script>

<template>
  <div class="user-additionals__editor additionals-editor">
    <DeleteAdditionalButton :additionalID="props.additional._id" />
    <EditAdditionalButton :additional="props.additional" />
    <CopyAdditionalButton :additionalID="props.additional._id" />
  </div>
</template>

<style>
  .user-additionals__editor {
    display: flex;
    flex-direction: row-reverse;
    align-self: center;
    margin-top: 10px;
    width: 170px;
  }
</style>

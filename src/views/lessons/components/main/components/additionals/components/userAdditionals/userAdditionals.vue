<script setup>
  import AdditionalsEditor from './components/additionalsEditor/additionalsEditor.vue';

  const props = defineProps({
    additional: Object,
  });
</script>

<template>
  <div class="additionals__user-additionals user-additionals">
    <AdditionalsEditor :additional="props.additional" />
    <a
      class="additionals__link additionals-link user-additionals__link"
      :href="props.additional.address"
      target="_blank"
    >
      <div
        class="additionals-link__content"
        :title="props.additional.description"
      >
        {{ props.additional.name }}
      </div>
    </a>
  </div>
</template>

<style>
  /*content, additionals__link в родителе*/
  .additionals__user-additionals {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>

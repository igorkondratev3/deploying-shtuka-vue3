<script setup>
  import { ref, inject } from 'vue';
  import { additionalsCollection } from '@/stores/additionalsCollection.js';
  import { authContext } from '@/stores/authContext.js';
  import { deleteElementFromDB } from '@/views/generalFunctions/requestsToBackend.js';
  import { showErrorSymbol } from '@/views/lessons/components/main/components/additionals/symbols.js';

  const props = defineProps({
    additionalID: String,
  });
  const showError = inject(showErrorSymbol);

  const storeAuthContext = authContext();
  const storeAdditionalsCollection = additionalsCollection();

  const isDelete = ref(false);

  const deleteAdditional = async () => {
    isDelete.value = true;

    const deletedAdditional = await deleteElementFromDB(
      'additionals',
      props.additionalID,
      storeAuthContext.user.token,
      storeAuthContext.user.refreshToken
    );

    if (deletedAdditional.error) {
      showError(deletedAdditional.error);
      isDelete.value = false;
      return;
    }

    storeAdditionalsCollection.deleteAdditional(deletedAdditional);
    isDelete.value = false;
  };
</script>

<template>
  <button
    class="additionals-editor__button editor-button"
    title="удалить"
    @click="deleteAdditional"
    :disabled="isDelete"
  >
    <img
      :class="{
        'icon_disabled-color': isDelete,
        'icon_delete-color': !isDelete,
      }"
      class="icon_small-size"
      src="/src/assets/close.svg"
    />
  </button>
</template>

<style>
  /*icon в app.vue*/
</style>

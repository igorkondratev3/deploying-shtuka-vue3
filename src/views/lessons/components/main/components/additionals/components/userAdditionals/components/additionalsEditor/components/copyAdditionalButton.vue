<script setup>
  import { ref, inject } from 'vue';
  import { additionalsCollection } from '@/stores/additionalsCollection.js';
  import { authContext } from '@/stores/authContext.js';
  import {
    getNewTokens,
    updateTokens,
  } from '@/views/generalFunctions/refreshToken.js';
  import { showErrorSymbol } from '@/views/lessons/components/main/components/additionals/symbols.js';

  const props = defineProps({
    additionalID: String,
  });
  const showError = inject(showErrorSymbol);

  const storeAuthContext = authContext();
  const storeAdditionalsCollection = additionalsCollection();
  const isCopy = ref(false);

  const copyAdditional = async () => {
    isCopy.value = true;

    let response;
    let payload;

    try {
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/lesson/additionals/copy`,
        {
          method: 'POST',
          body: JSON.stringify({ _id: props.additionalID }),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${storeAuthContext.user?.token}`,
          },
        }
      );
      payload = await response.json();
    } catch(error) {
      showError('Ошибка доступа к серверу');
      isCopy.value = false;
      return;
    }

    if (payload.error === 'Необходимо предоставить refreshToken') {
      const tokens = await getNewTokens(storeAuthContext.user.refreshToken);

      if (tokens.error) {
        showError(tokens.error);
        isCopy.value = false;
        return;
      }
      updateTokens(tokens);
      copyAdditional();
      return;
    }

    if (!response.ok) {
      showError(payload.error);
      isCopy.value = false;
    }

    if (response.ok) {
      storeAdditionalsCollection.setAdditional(payload);
      isCopy.value = false;
    }
  };
</script>

<template>
  <button
    class="additionals-editor__button editor-button"
    title="копировать"
    @click="copyAdditional"
    :disabled="isCopy"
  >
    <img
      :class="{ 'icon_disabled-color': isCopy, 'icon_copy-color': !isCopy }"
      class="icon_small-size"
      src="/src/assets/copy.svg"
    />
  </button>
</template>

<style>
  /*icon в app.vue*/
</style>

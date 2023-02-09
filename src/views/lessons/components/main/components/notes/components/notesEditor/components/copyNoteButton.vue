<script setup>
  import { ref, inject } from 'vue';
  import { theoryNotesCollection } from '@/stores/theoryNotesCollection.js';
  import { authContext } from '@/stores/authContext.js';
  import {
    getNewTokens,
    updateTokens,
  } from '@/views/generalFunctions/refreshToken.js';
  import { showErrorSymbol } from '@/views/lessons/components/main/components/notes/symbols.js';

  const props = defineProps({
    noteID: String,
  });
  const showError = inject(showErrorSymbol);

  const storeAuthContext = authContext();
  const storeTheoryNotesCollection = theoryNotesCollection();
  const isCopy = ref(false);

  const copyNote = async () => {
    isCopy.value = true;

    let response;
    let payload;

    try {
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/lesson/theory-notes/copy`,
        {
          method: 'POST',
          body: JSON.stringify({ _id: props.noteID }),
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
      copyNote();
      return;
    }

    if (!response.ok) {
      showError(payload.error);
      isCopy.value = false;
    }

    if (response.ok) {
      storeTheoryNotesCollection.setTheoryNote(payload);
      isCopy.value = false;
    }
  };
</script>

<template>
  <button
    class="note-editor__button editor-button"
    title="копировать"
    @click="copyNote"
    :disabled="isCopy"
  >
    <img
      :class="{ 'icon_disabled-color': isCopy, 'icon_copy-color': !isCopy }"
      class="icon_middle-size"
      src="/src/assets/copy.svg"
    />
  </button>
</template>

<style>
  /*editor-button, icon в app.vue*/
</style>

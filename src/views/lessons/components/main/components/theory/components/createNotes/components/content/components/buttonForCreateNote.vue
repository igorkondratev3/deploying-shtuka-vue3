<script setup>
  import { lessonNum } from '@/stores/lessonNum.js';
  import { theoryNotesCollection } from '@/stores/theoryNotesCollection.js';
  import { authContext } from '@/stores/authContext.js';
  import { ref } from 'vue';
  import { getNewTokens } from '@/views/generalFunctions/refreshToken.js';

  const storeLessonNum = lessonNum();
  const storeTheoryNotesCollection = theoryNotesCollection();
  const storeAuthContext = authContext();

  const emits = defineEmits([
    'clearTextAndStyleForNotesContent',
    'calucalateWidthAndHeightForNote',
    'showError',
  ]);
  const props = defineProps({
    textNotes: String,
    styleForNotesContent: Object,
    widthAndHeightForNote: Object,
  });

  const isCreate = ref(false);

  const createNote = async () => {
    isCreate.value = true;

    if (!props.textNotes.trim().length) {
      emits('showError', 'Поле для пометок должно быть заполнено');
      isCreate.value = false;
      return;
    }

    emits('calucalateWidthAndHeightForNote');
    const note = {
      circle: storeLessonNum.circleNumber,
      grade: storeLessonNum.gradeNumber,
      lesson: storeLessonNum.lessonNumber,
      text: props.textNotes,
      textStyle: {},
    };

    for (let key in props.styleForNotesContent) {
      note.textStyle[key] = props.styleForNotesContent[key];
    }

    note.textStyle.width = props.widthAndHeightForNote.width + 'px';
    note.textStyle.height = props.widthAndHeightForNote.height + 'px';

    let response;
    let payload;

    try {
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/lesson/theory-notes`,
        {
          method: 'POST',
          body: JSON.stringify(note),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${storeAuthContext.user?.token}`,
          },
        }
      );

      payload = await response.json();
    } catch(error) {
      emits('showError', 'Ошибка доступа к серверу');
      isCreate.value = false;
      return;
    }
    if (payload.error === 'Необходимо предоставить refreshToken') {
      const tokens = await getNewTokens(storeAuthContext.user?.refreshToken);
      if (tokens.error) {
        emits('showError', tokens.error);
        isCreate.value = false;
        return;
      }

      storeAuthContext.updateTokens(tokens.token, tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(storeAuthContext.user));
      createNote();
      return;
    }

    if (!response.ok) {
      emits('showError', payload.error);
      isCreate.value = false;
    }

    if (response.ok) {
      storeTheoryNotesCollection.setTheoryNote(payload);
      emits('clearTextAndStyleForNotesContent');
      isCreate.value = false;
    }
  };
</script>

<template>
  <button
    @click="createNote"
    class="create-note__button"
    :disabled="isCreate"
    :class="{ disabled: isCreate }"
  >
    Создать пометку
  </button>
</template>

<style>
  /*create-note__button в родителе*/
</style>

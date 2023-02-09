<script setup>
  import ButtonShowCreateNotes from './components/buttonShowCreateNotes/buttonShowCreateNotes.vue';
  import CreateNotes from './components/createNotes/CreateNotes.vue';
  import NeedAuth from '@/views/generalComponents/needAuth/needAuth.vue';
  import { ref, computed, watch, watchEffect, inject } from 'vue';
  import { lessonNum } from '@/stores/lessonNum.js';
  import { defineAsyncComponent } from 'vue';
  import { authContext } from '@/stores/authContext.js';
  import { openDialog, closeDialog } from '@/views/generalFunctions/dialog.js';
  import { changeCanChangeLessonSymbol } from '@/views/lessons/symbols.js';

  const emits = defineEmits(['changeTheoryComponent']);

  const Circle1Lesson1 = defineAsyncComponent(() =>
    import(/* @vite-ignore */ `./components/circle1/lesson1/lesson1Vue.vue`)
  );
  const Circle1Lesson2 = defineAsyncComponent(() =>
    import(/* @vite-ignore */ `./components/circle1/lesson2/lesson2Vue.vue`)
  );

  const componentsList = {
    Circle1Lesson1,
    Circle1Lesson2,
  };

  const changeCanChangeLesson = inject(changeCanChangeLessonSymbol);

  const storeLessonNum = lessonNum();

  const theoryComponent = computed(() => {
    return componentsList[storeLessonNum.theoryComponentName];
  });

  watchEffect(() => {
    if (theoryComponent.value) emits('changeTheoryComponent', true);
    else emits('changeTheoryComponent', false);
  });

  const notesSeen = ref(false);
  const dialogNeedAuth = ref(null);
  const storeAuthContext = authContext();

  watch(storeAuthContext, () => {
    if (!storeAuthContext.user) {
      notesSeen.value = false;
    } else {
      changeCanChangeLesson(true);
      closeDialog(dialogNeedAuth.value);
    }
  });

  const handleShowCreateNotes = () => {
    if (storeAuthContext.user) notesSeen.value = !notesSeen.value;
    else {
      changeCanChangeLesson(false);
      openDialog(dialogNeedAuth.value);
    }
  };

  const closeNeedAuth = () => {
    changeCanChangeLesson(true);
    closeDialog(dialogNeedAuth.value);
  };
</script>

<template>
  <div class="main__theory lesson-theory">
    <Suspense v-if="theoryComponent">
      <component :is="theoryComponent"></component>
      <template #fallback>
        <div class="lesson-theory__suspense">Загрузка теории...</div>
      </template>
    </Suspense>
    <ButtonShowCreateNotes @click="handleShowCreateNotes" />
    <CreateNotes
      v-show="notesSeen"
      :editFromSeen="false"
      :notesSeen="notesSeen"
    />
    <dialog
      class="lesson-theory__dialog-need-auth"
      ref="dialogNeedAuth"
    >
      <NeedAuth
        allowedAction="оставлять пометки."
        @closeNeedAuth="closeNeedAuth"
      />
    </dialog>
  </div>
</template>

<style>
  .lesson-theory {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    order: 1;
  }

  .lesson-theory__suspense {
    color: red;
    border: 0.5px solid black;
    border-radius: 30px;
    padding: 100px 100px;
  }

  .lesson-theory__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(231, 229, 229, 0.548);
    padding: 0px 5px;
    border-radius: 30px;
  }
</style>

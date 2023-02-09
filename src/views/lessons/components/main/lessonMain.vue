<script setup>
  import LessonTheory from './components/theory/lessonTheory.vue';
  import LessonExample from './components/example/lessonsExample.vue';
  import LessonAdditionals from './components/additionals/lessonsAdditionals.vue';
  import LessonTitel from './components/lessonsTitel.vue';
  import LessonNote from './components/notes/lessonsNote.vue';
  import VisibilityControl from './components/visibilityControl/visibilityControl.vue';
  import { ref, computed, watch } from 'vue';
  import { theoryNotesCollection } from '@/stores/theoryNotesCollection.js';
  import { authContext } from '@/stores/authContext.js';
  import { lessonNum } from '@/stores/lessonNum.js';
  import { getElementsFromBackend } from '@/views/generalFunctions/requestsToBackend.js';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue';

  const storeTheoryNotesCollection = theoryNotesCollection();
  const storeLessonNum = lessonNum();
  const storeAuthContext = authContext();

  const notes = computed(() => {
    return storeTheoryNotesCollection[storeLessonNum.circle][
      storeLessonNum.grade
    ][storeLessonNum.lesson];
  });

  const isThereTheory = ref(true);
  const isThereExample = ref(true);
  const error = ref('');
  const visibilityControl = ref({
    titel: true,
    theory: true,
    example: true,
    additionals: true,
    notes: true,
  });
  const seenButtonsVisibilityControl = ref({
    titel: true,
    theory: computed(() => isThereTheory.value),
    example: computed(() => isThereExample.value),
    additionals: true,
    notes: computed(() => {
      if (error.value) return true;
      if (!notes.value) return false;
      if (notes.value[0]) return true;
      return false;
    }),
  });

  if (storeAuthContext.user) setTheoryNotesInTheoryStoreCollection();

  watch(storeLessonNum, () => {
    if (storeAuthContext.user) setTheoryNotesInTheoryStoreCollection();
  });

  watch(storeAuthContext, () => {
    if (storeAuthContext.user) setTheoryNotesInTheoryStoreCollection();
  }); //обновление токенов и запись объекта user

  if (localStorage.visibilityControl) {
    const visibilityControlFromLocalStorage = JSON.parse(
      localStorage.getItem('visibilityControl')
    );
    for (let key in visibilityControl.value) {
      visibilityControl.value[key] = visibilityControlFromLocalStorage[key];
    }
  } else {
    localStorage.setItem(
      'visibilityControl',
      JSON.stringify(visibilityControl.value)
    );
  }

  async function setTheoryNotesInTheoryStoreCollection() {
    if (
      !storeTheoryNotesCollection[storeLessonNum.circle][storeLessonNum.grade][
        storeLessonNum.lesson
      ]
    ) {
      const theoryNotes = await getElementsFromBackend(
        'theory-notes',
        storeLessonNum.circleNumber,
        storeLessonNum.gradeNumber,
        storeLessonNum.lessonNumber
      );

      if (!theoryNotes) return;

      if (theoryNotes.error) {
        error.value = theoryNotes.error;
        return;
      }
      if (theoryNotes[0])
        storeTheoryNotesCollection.setTheoryNotes(theoryNotes);
    }
  }

  const changeVisibility = (element) => {
    visibilityControl.value[element] = !visibilityControl.value[element];
    localStorage.setItem(
      'visibilityControl',
      JSON.stringify(visibilityControl.value)
    );
  };
</script>

<template>
  <main class="lesson-layout__main lesson-main">
    <LessonTitel
      class="lesson-main__titel"
      v-show="visibilityControl.titel"
    />
    <div class="lesson-main__content">
      <LessonTheory
        v-show="visibilityControl.theory"
        @changeTheoryComponent="
          (isThereTheoryValue) => (isThereTheory = isThereTheoryValue)
        "
      />
      <LessonExample
        v-show="visibilityControl.example && isThereExample"
        @changeExampleComponent="
          (isThereExampleValue) => (isThereExample = isThereExampleValue)
        "
      />
      <LessonAdditionals v-show="visibilityControl.additionals" />
      <div
        class="lesson-main__notes"
        v-show="visibilityControl.notes && seenButtonsVisibilityControl.notes"
      >
        <LessonNote
          v-for="note in notes"
          :key="note.id"
          :note="note"
        />
        <ErrorVue
          v-if="error"
          :error="error"
          @closeError="error = ''"
        />
      </div>
    </div>
    <VisibilityControl
      :visibilityControl="visibilityControl"
      :seenButtonsVisibilityControl="seenButtonsVisibilityControl"
      @changeVisibility="changeVisibility"
    />
  </main>
</template>

<style>
  .lesson-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .lesson-layout__main {
    margin: 0px 16px;
  }

  .lesson-main__titel {
    align-self: flex-start;
    margin-bottom: 50px;
  }

  .lesson-main__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .lesson-main__notes {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    order: 4;
    overflow-x: auto; /*уменьшает блок при уменьшении экрана*/
    margin-top: 10px;
  }

  @media (max-width: 1420px) {
    .lesson-main__content {
      justify-content: center;
    }
  }
</style>

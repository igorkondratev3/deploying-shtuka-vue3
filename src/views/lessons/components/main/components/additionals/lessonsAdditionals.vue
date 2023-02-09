<script setup>
  import VideoLessonURL from './components/videoLessonURL.vue';
  import TextBook from './components/textBook.vue';
  import ButtonForCreateAdditional from './components/buttonForCreateAdditional.vue';
  import CreateAdditionalsForm from './components/createAdditionalsForm/createAdditionalsForm.vue';
  import UserAdditionals from './components/userAdditionals/userAdditionals.vue';
  import NeedAuth from '@/views/generalComponents/needAuth/needAuth.vue';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue';
  import { ref, computed, watch, provide, inject } from 'vue';
  import { additionalsCollection } from '@/stores/additionalsCollection';
  import { authContext } from '@/stores/authContext';
  import { lessonNum } from '@/stores/lessonNum';
  import { getElementsFromBackend } from '@/views/generalFunctions/requestsToBackend';
  import { showErrorSymbol } from './symbols';
  import { openDialog, closeDialog } from '@/views/generalFunctions/dialog.js';
  import { changeCanChangeLessonSymbol } from '@/views/lessons/symbols.js';

  const storeAdditionalsCollection = additionalsCollection();
  const storeLessonNum = lessonNum();
  const storeAuthContext = authContext();
  const dialogNeedAuth = ref(null);
  const error = ref('');
  const dialogCreateAdditionals = ref(null);
  const isCreateForm = ref(true);
  const additionalForEdit = ref({});
  const additionals = computed(() => {
    return storeAdditionalsCollection[storeLessonNum.circle][
      storeLessonNum.grade
    ][storeLessonNum.lesson];
  });

  const showError = (errorValue) => (error.value = errorValue);
  const changeCanChangeLesson = inject(changeCanChangeLessonSymbol);
  provide(showErrorSymbol, showError);
  provide('openCreateAdditionalsForm', openCreateAdditionalsForm);

  if (storeAuthContext.user) setAdditionalsInAdditionalsCollection();

  watch(storeLessonNum, () => {
    if (storeAuthContext.user) setAdditionalsInAdditionalsCollection();
  });

  watch(storeAuthContext, () => {
    if (storeAuthContext.user) setAdditionalsInAdditionalsCollection();
    else {
      changeCanChangeLesson(true);
      closeDialog(dialogCreateAdditionals.value);
    }
  });

  async function setAdditionalsInAdditionalsCollection() {
    if (
      !storeAdditionalsCollection[storeLessonNum.circle][storeLessonNum.grade][
        storeLessonNum.lesson
      ]
    ) {
      const additionals = await getElementsFromBackend(
        'additionals',
        storeLessonNum.circleNumber,
        storeLessonNum.gradeNumber,
        storeLessonNum.lessonNumber
      );

      if (!additionals) return;

      if (additionals.error) {
        error.value = additionals.error;
        return;
      }

      if (additionals[0])
        storeAdditionalsCollection.setAdditionals(additionals);
    }
  }

  function openCreateAdditionalsForm(whatIsForm, additional) {
    if (!storeAuthContext.user) {
      changeCanChangeLesson(false);
      openDialog(dialogNeedAuth.value);
      return;
    }

    if (whatIsForm === 'create') {
      isCreateForm.value = true;
      changeCanChangeLesson(false);
      openDialog(dialogCreateAdditionals.value);
    }

    if (whatIsForm === 'edit') {
      isCreateForm.value = false;
      additionalForEdit.value = additional;
      changeCanChangeLesson(false);
      openDialog(dialogCreateAdditionals.value);
    }
  }

  const closeCreateAdditionalForm = () => {
    additionalForEdit.value = {};
    changeCanChangeLesson(true);
    closeDialog(dialogCreateAdditionals.value);
  };

  const closeNeedAuth = () => {
    changeCanChangeLesson(true);
    closeDialog(dialogNeedAuth.value);
  };
</script>

<template>
  <div class="lesson-main__additionals additionals">
    <div class="additionals__content">
      <div class="additionals__title">
        <b>Дополнительные материалы:</b>
      </div>
      <VideoLessonURL />
      <TextBook />
      <UserAdditionals
        v-for="additional in additionals"
        :key="additional.id"
        :additional="additional"
      />
    </div>
    <ButtonForCreateAdditional @click="openCreateAdditionalsForm('create')" />
    <ErrorVue
      class="additionals__error"
      v-if="error"
      :error="error"
      @closeError="error = ''"
    />
    <dialog
      class="additionals__dialog-create-additionals"
      ref="dialogCreateAdditionals"
    >
      <CreateAdditionalsForm
        :isCreateForm="isCreateForm"
        :additionalForEdit="additionalForEdit"
        @closeCreateAdditionalForm="closeCreateAdditionalForm"
      />
    </dialog>
    <dialog
      class="additionals__dialog-need-auth"
      ref="dialogNeedAuth"
    >
      <NeedAuth
        allowedAction="оставлять дополнения."
        @closeNeedAuth="closeNeedAuth"
      />
    </dialog>
  </div>
</template>

<style>
  @import './additionalsLink.css';

  .additionals {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .lesson-main__additionals {
    order: 3;
  }

  .additionals__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-height: 500px;
    overflow: auto;
    padding-right: 7px;
  }

  .additionals__title {
    font: oblique 18px Times New Roman;
    text-align: center;
    color: black;
    margin-bottom: 10px;
    max-width: 150px;
  }

  .additionals__error {
    width: 170px;
  }

  @media (max-width: 1600px) {
    .lesson-main__additionals {
      margin-top: 15px;
      order: 5;
    }
    .additionals__content {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-end;
    }
    .additionals__title {
      margin-bottom: 0px;
    }
  }
</style>

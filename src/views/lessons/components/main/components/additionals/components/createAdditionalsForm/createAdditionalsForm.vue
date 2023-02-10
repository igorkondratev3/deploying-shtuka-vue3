<script setup>
  import { ref, computed, watch } from 'vue';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue';
  import { checkClose } from '@/views/generalFunctions/checkClose.js';
  import AddButtonAdditionalForm from './components/addButtonAdditionalForm.vue';
  import EditButtonAdditionalForm from './components/editButtonAdditionalForm.vue';

  const emit = defineEmits(['closeCreateAdditionalForm']);
  const address = ref('');
  const name = ref('');
  const description = ref('');
  const error = ref('');
  const resourceAddress = ref(null);

  const correctAdditionalValues = computed(() => ({
    address: address.value,
    name: name.value,
    description: description.value,
  }));

  const props = defineProps({
    isCreateForm: Boolean,
    additionalForEdit: Object,
  });

  watch(
    () => props.additionalForEdit,
    () => {
      if (props.additionalForEdit.address) {
        address.value = props.additionalForEdit.address;
        name.value = props.additionalForEdit.name;
        description.value = props.additionalForEdit.description;
      }
    }
  );

  const handleCloseFormFromButtons = () => {
    address.value = '';
    name.value = '';
    description.value = '';
    emit('closeCreateAdditionalForm');
  };
</script>

<template>
  <div
    class="additionals__create-additionals create-additionals"
    @click="checkClose($event) ? handleCloseFormFromButtons() : undefined"
  >
    <div class="create-additionals__form">
      <button
        class="create-additionals__close-button"
        @click="handleCloseFormFromButtons"
      >
        <img src="/src/assets/close.svg" />
      </button>
      <form>
        <label for="address">Адрес ресурса</label>
        <input
          type="url"
          class="create-additionals__input"
          id="address"
          v-model="address"
          ref="resourceAddress"
          required
        />
        <label for="name">Обозначение ресурса</label>
        <input
          type="text"
          v-model="name"
          class="create-additionals__input"
          id="name"
        />
        <label for="description">Описание ресурса</label>
        <input
          type="text"
          v-model="description"
          class="create-additionals__input"
          id="description"
        />
      </form>
      <AddButtonAdditionalForm
        v-if="props.isCreateForm"
        :resourceAddress="resourceAddress"
        :correctAdditionalValues="correctAdditionalValues"
        @showError="(errorValue) => (error = errorValue)"
        @closeCreateAdditionalForm="handleCloseFormFromButtons"
      />
      <EditButtonAdditionalForm
        v-if="!props.isCreateForm"
        :resourceAddress="resourceAddress"
        :additionalID="props.additionalForEdit._id"
        :correctAdditionalValues="correctAdditionalValues"
        @showError="(errorValue) => (error = errorValue)"
        @closeCreateAdditionalForm="handleCloseFormFromButtons"
      />
      <ErrorVue
        class="create-additionals__error"
        v-if="error"
        :error="error"
        @closeError="error = ''"
      />
      <!--v-if здесь, а не на компонентах и не v-show так как хочу чтобы код в error отрабатывался при открытии-->
    </div>
  </div>
</template>

<style>
  .create-additionals {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.788);
    backdrop-filter: blur(5px);
  }

  .additionals__create-additionals {
    position: fixed;
    left: 0;
    top: 0;
  }

  .create-additionals__form {
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;
    max-width: 600px;
    padding: 20px 20px;
    border-radius: 10px;
    background-color: rgb(239, 240, 236);
  }
  .create-additionals__close-button {
    position: absolute;
    right: 0;
    top: 0;
    overflow-x: hidden;
    cursor: default;
    border: none;
    max-width: 34px;
    padding-top: 3px;
    padding-left: 1px;
    width: 25px;
    border-radius: 0px 10px 0px 0px;
  }
  .create-additionals__close-button:hover {
    background-color: rgb(116, 107, 107);
  }
  .create-additionals__input {
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 3px;
  }
  .create-additionals__input:focus {
    border: 1px solid rgb(12, 82, 87);
  }

  .create-additionals__error {
    margin-top: 20px;
  }
  /*buttons в app.vue*/
</style>

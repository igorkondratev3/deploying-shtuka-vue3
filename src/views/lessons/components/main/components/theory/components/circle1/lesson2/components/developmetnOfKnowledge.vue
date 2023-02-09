<script setup>
  import ArrowRight from './arrow/arrowRight.vue';
</script>

<template>
  <div
    class="theory-content__development-of-knowledge development-of-knowledge"
  >
    <h3 class="development-of-knowledge__title">
      <b>Знание развивается по винтовой линии:</b>
    </h3>
    <div class="development-of-knowledge__content">
      <p>Наблюдение</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Гипотеза</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Эксперимент</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Гипотеза</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Эксперимент</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Гипотеза...</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Закон</p>
      <ArrowRight class="development-of-knowledge__arrow" />
      <p>Теория</p>
    </div>
  </div>
</template>

<style>
  .development-of-knowledge {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font: oblique 18px 'Times New Roman';
  }

  .theory-content__development-of-knowledge {
    margin-bottom: 10px;
    margin-top: 5px;
  }

  .development-of-knowledge__title {
    text-align: left;
    color: black;
    align-self: center;
  }
  .development-of-knowledge__content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: 16px;
    text-align: left;
    color: black;
  }
  .development-of-knowledge__arrow {
    align-self: flex-end;
    margin-bottom: 3px;
    margin-left: 3px;
    margin-right: 3px;
  }
</style>

<script setup>
  import ArrowRight from './arrow/arrowRight.vue';
</script>

<template>
  <p class="theory-content__example-study-phenomena example-study-phenomena">
    <b>Пример изучения явлений:</b><br />
    <b>Наблюдение</b>: тяжелые тела падают быстрее легких (камень и лист
    бумаги).<br />
    <ArrowRight class="example-study-phenomena__arrow" />
    <b>Гипотеза</b>: любое тяжелое тело падает быстрее легкого.<br />
    <ArrowRight class="example-study-phenomena__arrow" />
    <b>Эксперимент</b>: комок бумаги падает быстрее несвернутого листа.<br />
    <ArrowRight class="example-study-phenomena__arrow" />
    <b>Гипотеза</b>: кроме силы тяжести что-то влияет на скорость падения бумаги
    (возможно, воздух?).<br />
    <ArrowRight class="example-study-phenomena__arrow" />
    <b>Эксперимент</b>: тела с разной массой (монета и перо), помещенные в
    безвоздушное пространство (трубка с выкаченным воздухом) падают с одинаковой
    скоростью.<br />
    <ArrowRight class="example-study-phenomena__arrow" />
    <b>Закон</b>: закон свободного падения (когда ничего не влияет кроме силы
    тяжести) – все тела падают под действием силы тяжести одинаково.
  </p>
</template>

<style>
  .example-study-phenomena {
    text-align: left;
    padding: 0px 5px 0px 16px;
    color: black;
    font: oblique 18px 'Times New Roman';
    max-width: 950px;
  }
  .example-study-phenomena__arrow {
    display: block;
    transform: rotate(90deg);
    margin-left: -15px;
  }
</style>

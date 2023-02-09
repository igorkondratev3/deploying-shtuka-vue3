<script setup></script>

<template>
  <div class="theory-content__scientifics-methods scientifics-methods">
    <h3 class="scientifics-methods__title">Научные методы изучения природы</h3>
    <div class="scientifics-methods__methods">
      <p>
        <b>Наблюдение</b><br />исследование явления без создания для этого
        специальных условий
      </p>
      <p>
        <b>Эксперимент</b><br />исследование явления в специально созданных
        условиях
      </p>
      <p>
        <b>Гипотеза</b><br />предположение, выдвигаемое по результатам
        наблюдения или эксперимента
      </p>
    </div>
    <p class="scientifics-methods__example">
      Научные методы изучения природы позволяют исключить условия, при которых
      существует вероятность получения ложных данных (например, из-за обмана
      зрения(см. пример)).
    </p>
  </div>
</template>

<style>
  .scientifics-methods {
    font: oblique 18px 'Times New Roman';
    text-align: left;
    color: black;
    margin: 5px;
    padding: 0px 5px 0px 16px;
  }

  .scientifics-methods__title {
    text-align: center;
  }

  .scientifics-methods__methods {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 10px;
  }
  .scientifics-methods__methods p {
    max-width: 300px;
    margin: 0 5px;
    margin-bottom: 5px;
    border: 1px dotted black;
    border-radius: 30px;
  }
  .scientifics-methods__example {
    max-width: 800px;
  }
</style>

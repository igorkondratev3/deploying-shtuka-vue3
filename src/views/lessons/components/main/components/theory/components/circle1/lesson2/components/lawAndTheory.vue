<script setup></script>

<template>
  <div class="theory-content__law-and-theory law-and-theory">
    <p>
      <b>Закон</b><br />вывод, сделанный по результатам применения научных
      методов изучения природы.
    </p>
    <p>
      <b>Теория</b><br />обобщенное описание законов на количественном уровне с
      помощью физических величин.
    </p>
  </div>
</template>

<style>
  .law-and-theory {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    font: oblique 18px 'Times New Roman';
  }

  .theory-content__law-and-theory {
    margin-top: 10px;
  }

  .law-and-theory p {
    text-align: center;
    color: black;
    border: 1px dotted black;
    border-radius: 30px;
    max-width: 400px;
    margin: 0 5px 5px 5px;
    padding: 5px;
  }
</style>

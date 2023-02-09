<script setup>
  import { RouterView } from 'vue-router';
  import { lessonNum } from './stores/lessonNum.js';
  import { authContext } from './stores/authContext.js';
  import { shtukaChannel } from '@/shtukaChannel.js';
  import { deleteUserInformationFromStores } from '@/views/generalFunctions/deleteUserInformationFromStores.js';

  const storeAuthContext = authContext();
  if (localStorage.getItem('user'))
    storeAuthContext.login(JSON.parse(localStorage.getItem('user')));

  const storeLessonNum = lessonNum();
  if (localStorage.getItem('lesson')) {
    const lessonParameters = JSON.parse(localStorage.getItem('lesson'));
    storeLessonNum.changeLessonNumber(
      lessonParameters.circleNumber,
      lessonParameters.gradeNumber,
      lessonParameters.lessonNumber
    );
  }

  shtukaChannel.onmessage = (event) => {
    if (event.data === 'logout') deleteUserInformationFromStores();
    if (event.data === 'login')
      storeAuthContext.login(JSON.parse(localStorage.getItem('user')));
  };
</script>

<template>
  <RouterView />
</template>

<style>
  @import '@/assets/css/icons.css';
  @import '@/assets/css/buttons.css';
  @import '@/assets/css/editorButton.css';

  @font-face {
    font-family: 'Pacifico';
    src: url(https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6D6MmTpA.woff2)
      format('woff2');
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    font-display: swap;
  }
</style>

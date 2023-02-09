<script setup>
  import { computed, watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { lessonsCollection } from '@/stores/lessonsCollection.js';
  import { lessonNum } from '@/stores/lessonNum.js';
  import { getLessons } from '../../generalFunctions/requestsToBackend.js';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue';

  const props = defineProps({ circleAndGrade: Object });
  const storeLessonsCollection = lessonsCollection();
  const error = ref('');

  setLessons();
  watch(props.circleAndGrade, () => {
    setLessons();
  });

  async function setLessons() {
    if (
      !storeLessonsCollection.isFull[
        `circle${props.circleAndGrade.circle}grade${props.circleAndGrade.grade}`
      ]
    ) {
      const lessons = await getLessons(
        props.circleAndGrade.circle,
        props.circleAndGrade.grade
      );

      if (lessons.error) {
        error.value = lessons.error;
        return;
      }
      storeLessonsCollection.setLessons(lessons);
    }
  }

  const storeLessonNum = lessonNum();
  const router = useRouter();

  const chooseLesson = (lessonNumber) => {
    storeLessonNum.changeLessonNumber(
      props.circleAndGrade.circle,
      props.circleAndGrade.grade,
      lessonNumber
    );
    router.push({ path: '/lessonLayout' });
  };

  const excludeLessonNumber = (content, contentIndex) => {
    if (contentIndex > 0) {
      return content;
    }
  };

  const lessons = computed(() => {
    return storeLessonsCollection['circle' + props.circleAndGrade.circle][
      'grade' + props.circleAndGrade.grade
    ];
  });

  const getLessonHeadings = (numberOfLesson) => {
    //тут проблема когда в уоллекции уже имеется урок, но он не первый (например, 11 класс, 29 урок)
    const lessonNumber =
      numberOfLesson + props.circleAndGrade.addForNumberOfLesson;

    if (lessonNumber != lessons.value[`lesson${lessonNumber}`]?.lesson)
      return [''];

    return lessons.value[`lesson${lessonNumber}`]?.headings;
  };
</script>

<template>
  <div class="lessons-list__lessons lessons">
    <div
      class="lessons__lesson lesson"
      v-for="numberOfLesson in Object.keys(lessons).length"
      :key="numberOfLesson.id"
      @click="
        chooseLesson(numberOfLesson + props.circleAndGrade.addForNumberOfLesson)
      "
    >
      <!--перебираем номера так как объекты записываются не по порядку, не хочу записывать в массив чтобы не было разреженных и вообще так больше нравится-->
      <div class="lesson__number">
        {{ getLessonHeadings(numberOfLesson)[0] }}
      </div>
      <div class="lesson__theme">
        <template
          v-for="(head, headIndex) in getLessonHeadings(numberOfLesson)"
        >
          {{ excludeLessonNumber(head, headIndex) }} {{ ' ' }}
        </template>
      </div>
    </div>
    <ErrorVue
      v-if="error"
      :error="error"
      @closeError="error = ''"
    />
  </div>
</template>

<style>
  .lessons-list__lessons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .lessons__lesson {
    font: oblique 16px 'Times New Roman';
    text-align: center;
    user-select: none;
    border: 0.5px dotted black;
    border-radius: 30px;
    width: 330px;
    height: 95px;
    margin: 10px;
    padding: 5px;
  }

  .lessons__lesson:hover {
    background-color: #c5c8cb;
  }

  .lesson {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
  }

  .lesson__number {
    color: rgb(255, 115, 0);
    font-weight: bold;
  }
</style>

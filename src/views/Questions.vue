<template>
  <div>
    <h1>{{currentTime}}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSurveyStore } from '../store/SurveyStore';

const surveyStore = useSurveyStore();
const allQuestions = ref();
const timeLimit = 5;

let currentTime = ref(timeLimit);

const countdown = () => {
  if (currentTime.value > 0) {
    setTimeout(() => {
      currentTime.value--;
      countdown();
    }, 1000);
  }
}


onMounted(async () => {
  await surveyStore.getSurveyQuestions();
  allQuestions.value = surveyStore.surveyQuestions;
  countdown();
});
</script>
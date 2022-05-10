<template>
  <div>
    <div class="uk-card uk-card-default uk-margin-xlarge-top uk-width-4-5 uk-margin-auto">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Question #{{ surveyStore.currentQuestion + 1 }}</h3>
      </div>

      <div class="uk-card-body">
        <h1 class="uk-text-center" style="font-size: 100px" v-if="currentTime">{{ currentTime }}</h1>
        <h1 class="uk-text-center" style="font-size: 100px">{{ word }}</h1>
      </div>

      <div class="uk-card-footer">
        <div class="uk-margin">
            <input class="uk-range" type="range" value="4" min="1" max="7" step="1">
        </div>
        <button class="uk-button uk-button-primary uk-align-right" @click="next">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import router from '../router';
import { useSurveyStore } from '../store/SurveyStore';

const surveyStore = useSurveyStore();
const allQuestions = ref();
const words = ref();
const word = ref();
const question = ref();
const timeLimit = 5;
let wpm = 0;

let currentTime = ref(timeLimit);

const countdown = () => {
  if (currentTime.value > 0) {
    setTimeout(() => {
      currentTime.value--;
      countdown();
    }, 1000);
  }
  else {
    speedReader();
  }
}

let repeat: any;


function speedReader() {
  words.value = question.value.value.split(/\s+/);
  const speed = 1000 / (wpm / 60);
  repeat = setInterval(readWord, speed);
}

let index = 0;

function readWord() {
  word.value = words.value[index];
  ++index;
  if (index === words.value.length) {
    clearInterval(repeat);
  }
}

const next = () => {
  // if (surveyStore.currentQuestion < allQuestions.value.length) {
  //   surveyStore.currentQuestion++;
  //   currentTime.value = timeLimit;
  //   countdown();
  // } else {
  //   router.push('/results');
  // }
  surveyStore.currentQuestion++;
  router.push('/questions/' + surveyStore.currentQuestion);
}


onBeforeRouteUpdate((to, from, next) => {
  currentTime.value = timeLimit;
  question.value = surveyStore.surveyQuestions[surveyStore.currentQuestion];
});

onMounted(async () => {
  await surveyStore.getSurveyQuestions();
  await surveyStore.getSettings();
  wpm = surveyStore.surveySettings?.wpm as number;
  allQuestions.value = surveyStore.surveyQuestions.values;
  question.value = surveyStore.surveyQuestions[surveyStore.currentQuestion];
  countdown();
});
</script>
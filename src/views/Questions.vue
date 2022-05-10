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
        <div class="uk-margin uk-grid-medium uk-child-width-auto uk-grid">
          <label><input class="uk-radio" type="radio" value="1" v-model="ratingSelection"> 1 - Very dishonest</label>
          <label><input class="uk-radio" type="radio" value="2" v-model="ratingSelection"> 2 - Moderately
            dishonest</label>
          <label><input class="uk-radio" type="radio" value="3" v-model="ratingSelection"> 3 - Slightly
            dishonest</label>
          <label><input class="uk-radio" type="radio" value="4" v-model="ratingSelection"> 4 - Neither dishonest or
            honest</label>
          <label><input class="uk-radio" type="radio" value="5" v-model="ratingSelection"> 5 - Slightly honest</label>
          <label><input class="uk-radio" type="radio" value="6" v-model="ratingSelection"> 6 - Moderately honest</label>
          <label><input class="uk-radio" type="radio" value="7" v-model="ratingSelection"> 7 - Very honest</label>
        </div>
        <button class="uk-button uk-button-primary uk-align-right" :disabled="!ratingSelection"
          uk-toggle="target: #modal">Next</button>
      </div>
    </div>
  </div>

  <div id="modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Are you sure you want to submit?</h2>
      <p>You will not be able to change your answer after submitting.</p>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Cancel</button>
        <button class="uk-button uk-button-primary uk-modal-close" @click="next" type="button">Save</button>
      </p>
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
const ratingSelection = ref(0);
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
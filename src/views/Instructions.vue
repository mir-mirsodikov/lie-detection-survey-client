<template>
  <h1>Instructions</h1>

  <div class="uk-card uk-card-default uk-card-hover uk-margin-auto uk-width-3-4">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Instructions</h3>
    </div>

    <div class="uk-card-body">
      <p>{{instructions}}</p>
    </div>

    <div class="uk-card-footer">
      <button class="uk-button uk-button-primary uk-align-right" @click="beginSurvey">Begin</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../router';
import { useSurveyStore } from '../store/SurveyStore';

const surveyStore = useSurveyStore();

const instructions = ref();

const beginSurvey = async () => {
  router.push('/questions');
}

onMounted(async () => {
  await surveyStore.getSettings();
  instructions.value = surveyStore.surveySettings?.instructions;
});
</script>
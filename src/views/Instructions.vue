<template>
  <div class="uk-card uk-card-default uk-card-hover uk-margin-xlarge-top uk-margin-auto uk-width-3-4@l uk-width-4-5@m">
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
import { useRoute } from 'vue-router';

const surveyStore = useSurveyStore();

const instructions = ref();
const userId = ref<number>(0);

const beginSurvey = async () => {
  await surveyStore.getSurveyQuestions(userId.value);
  router.push({path: `/questions/${userId.value}`});
}

onMounted(async () => {
  userId.value = parseInt(useRoute().params.userId as string);
  if (!surveyStore.participant) {
    router.push({path: `/${userId.value}`});
  }
  await surveyStore.getSettings(userId.value);
  instructions.value = surveyStore.surveySettings?.instructions;
});
</script>
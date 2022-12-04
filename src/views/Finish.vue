<template>
  <div class="uk-card uk-card-default uk-width-3-4 uk-margin-auto uk-margin-xlarge-top">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Finish</h3>
    </div>

    <div class="uk-card-body">
      <p>{{endMessage}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSurveyStore } from '../store/SurveyStore';
import { useRoute } from 'vue-router';
import router from '../router';

const surveyStore = useSurveyStore();

const endMessage = ref();
const userId = ref<number>(0);

onMounted(async () => {
  userId.value = parseInt(useRoute().params.userId as string);
  if (!surveyStore.participant) {
    router.push({path: `/survey/${userId.value}`});
  }
  await surveyStore.getSettings(userId.value);
  endMessage.value = surveyStore.surveySettings?.endMessage;
});
</script>
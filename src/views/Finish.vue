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

const endMessage = ref();

onMounted(async () => {
  endMessage.value = useSurveyStore().surveySettings?.endMessage;
});
</script>
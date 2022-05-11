<template>
  <div class="uk-width-1-2 uk-margin uk-card uk-card-default uk-card-hover uk-margin-auto">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Settings</h3>
    </div>

    <div class="uk-card-body">
      <form class="uk-form-stacked" @submit.prevent="submit">
        <div class="uk-margin">
          <label for="" class="uk-form-label">Words duration</label>
          <div class="uk-form-controls">
            <input class="uk-input uk-width-1-4" type="text" placeholder="300" v-model="wordDuration">
          </div>

          <label for="" class="uk-margin uk-form-label">Instructions</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" rows="5" v-model="instructions"></textarea>
          </div>
        </div>

        <button class="uk-button uk-button-primary uk-align-right uk-margin-remove">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAdminStore } from '../store/AdminStore';
import { useSurveyStore } from '../store/SurveyStore';

const surveyStore = useSurveyStore();
const adminStore = useAdminStore();

const wordDuration = ref();
const instructions = ref();

async function submit() {
  await adminStore.setSettings({
    wordDuration: wordDuration.value,
    instructions: instructions.value,
  });
}

onMounted(async () => {
  await surveyStore.getSettings();
  wordDuration.value = surveyStore.surveySettings?.wordDuration;
  console.log(wordDuration.value);
  instructions.value = surveyStore.surveySettings?.instructions;
});
</script>
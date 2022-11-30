<template>
  <div class="uk-width-3-4 uk-margin uk-card uk-card-default uk-card-hover uk-margin-auto">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Settings</h3>
    </div>

    <div class="uk-card-body">
      <form class="uk-form-stacked" @submit.prevent="submit">
        <div class="uk-margin">
          <label for="" class="uk-form-label">Words duration</label>
          <div class="uk-form-controls">
            <input :class="error ? 'uk-form-danger uk-input uk-width-1-4' : 'uk-input uk-width-1-4'" type="text" placeholder="300" v-model="wordDuration">
          </div>

          <label for="" class="uk-margin uk-form-label">Instructions</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" rows="5" v-model="instructions" 
              placeholder="Instructions for the participants to read before the survey"></textarea>
          </div>

          <label for="" class="uk-margin uk-form-label">End message</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" rows="5" v-model="endMessage"
              placeholder="A message shown the participants to read after they finish the survey"></textarea>
          </div>
        </div>

        <button class="uk-button uk-button-primary uk-align-right uk-margin-remove">Save</button>
      </form>
    </div>

    <div class="uk-card-footer" v-if="error">
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAdminStore } from '../store/AdminStore';
import { useAuthStore } from '../store/auth';
import { useSurveyStore } from '../store/SurveyStore';

const surveyStore = useSurveyStore();
const adminStore = useAdminStore();

const wordDuration = ref();
const instructions = ref();
const endMessage = ref();
const error = ref();

async function submit() {
  const userId = useAuthStore().getUserId();

  if (!wordDuration.value) {
    error.value = 'Please enter a word duration';
    return;
  }

  await adminStore.setSettings({
    wordDuration: wordDuration.value,
    instructions: instructions.value,
    endMessage: endMessage.value,
  }, userId);
  error.value = '';
}

onMounted(async () => {
  const userId = useAuthStore().getUserId();
  await surveyStore.getSettings(userId);
  wordDuration.value = surveyStore.surveySettings?.wordDuration;
  instructions.value = surveyStore.surveySettings?.instructions;
  endMessage.value = surveyStore.surveySettings?.endMessage;
});
</script>
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SurveyService } from '../services/SurveyService';

export const useSurveyStore = defineStore('survey', () => {
  const surveySettings = ref<{
    wpm: number,
    instructions: string,
  }>();

  async function getSettings() {
    const response = await SurveyService.getSettings();
    surveySettings.value = response;
  }

  return {
    surveySettings,
    getSettings,
  }
});
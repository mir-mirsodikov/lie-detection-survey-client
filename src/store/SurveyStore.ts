import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SurveyService } from '../services/SurveyService';

export const useSurveyStore = defineStore('survey', () => {
  const surveySettings = ref<{
    wpm: number,
    instructions: string,
  }>();

  const participant = ref<{
    id: number,
    name: string,
    email: string
  }>();

  async function getSettings() {
    const response = await SurveyService.getSettings();
    surveySettings.value = response;
  }

  async function createParticipant(name: string, email: string, gender: string) {
    const response = await SurveyService.createParticipant(name, email, gender);
    participant.value = response;
  }

  return {
    surveySettings,
    getSettings,
    createParticipant,
    participant
  }
});
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SurveyService } from '../services/SurveyService';

export const useSurveyStore = defineStore('survey', () => {
  const surveySettings = ref<{
    wordDuration: number;
    instructions: string;
    endMessage: string;
  }>();

  const participant = ref<{
    id: number;
    name: string;
    email: string;
  }>();

  const surveyQuestions = ref<
    {
      id: number;
      value: string;
    }[]
  >([]);

  const currentQuestion = ref(0);

  async function getSettings(userId: number) {
    const response = await SurveyService.getSettings(userId);
    surveySettings.value = response;
  }

  async function createParticipant(
    name: string,
    email: string,
    gender: string,
  ) {
    const response = await SurveyService.createParticipant(name, email, gender);
    participant.value = response;
  }

  // shuffle array
  function shuffleArray(array: []) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  async function getSurveyQuestions(userId: number) {
    const response = await SurveyService.getSurveyQuestions(userId);
    if (response) {
      surveyQuestions.value = shuffleArray(response);
    }
  }

  async function submitSurvey(surveyId: number, rating: number) {
    await SurveyService.submitSurvey(participant.value!.id, surveyId, rating);
  }

  return {
    surveySettings,
    getSettings,
    createParticipant,
    participant,
    getSurveyQuestions,
    surveyQuestions,
    currentQuestion,
    submitSurvey,
  };
});

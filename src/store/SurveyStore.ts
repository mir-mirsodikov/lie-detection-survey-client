import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SurveyService } from '../services/SurveyService';

export const useSurveyStore = defineStore('survey', () => {
  const surveySettings = ref<{
    wpm: number;
    instructions: string;
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
  >();

  const currentQuestion = ref(0);

  async function getSettings() {
    const response = await SurveyService.getSettings();
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

  async function getSurveyQuestions() {
    const response = await SurveyService.getSurveyQuestions();
    if (response) {
      surveyQuestions.value = shuffleArray(response);
      currentQuestion.value = surveyQuestions.value[0].id;
    }
  }

  return {
    surveySettings,
    getSettings,
    createParticipant,
    participant,
    getSurveyQuestions,
    surveyQuestions,
    currentQuestion,
  };
});

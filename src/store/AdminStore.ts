import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AdminService } from '../services/AdminService';

export const useAdminStore = defineStore('admin', () => {
  const surveyQuestions = ref();
  const surveySettings = ref<{
    wpm: number,
    instructions: string,
  }>();

  async function createQuestion(question: string) {
    const response = await AdminService.createQuestion(question);
    surveyQuestions.value.push(response);
  }

  async function getQuestions() {
    surveyQuestions.value = await AdminService.getQuestions();
  }

  async function updateQuestion(id: number, value: string) {
    const response = await AdminService.updateQuestion(id, value);
    console.log(`response: ${JSON.stringify(response)}`);
    const index = surveyQuestions.value.findIndex(
      // @ts-ignore
      (question) => question.id === id,
    );

    console.log(index);
    console.log(surveyQuestions.value[index]);
    surveyQuestions.value[index] = response;
  }

  async function deleteQuestion(id: number) {
    const response = await AdminService.deleteQuestion(id);
    const index = surveyQuestions.value.findIndex(
      // @ts-ignore
      (question) => question.id === id,
    );
    surveyQuestions.value[index] = response;
  }

  async function setSettings(settings: {wpm: number, instructions: string}) {
    const response = await AdminService.setSettings(settings);
    surveySettings.value = response;
  }

  return {
    surveyQuestions,
    createQuestion,
    getQuestions,
    setSettings,
    updateQuestion,
    deleteQuestion
  }
});
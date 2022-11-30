import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AdminService } from '../services/AdminService';

export const useAdminStore = defineStore('admin', () => {
  const surveyQuestions = ref();
  const surveySettings = ref<{
    wordDuration: number;
    instructions: string;
    endMessage: string;
  }>();

  async function createQuestion(question: string, userId: number) {
    const response = await AdminService.createQuestion(question, userId);
    surveyQuestions.value.push(response);
  }

  async function getQuestions(userId: string) {
    surveyQuestions.value = await AdminService.getQuestions(userId);
  }

  async function updateQuestion(id: number, value: string, isActive: boolean) {
    const response = await AdminService.updateQuestion(id, value, isActive);
    const index = surveyQuestions.value.findIndex(
      // @ts-ignore
      (question) => question.id === id,
    );

    surveyQuestions.value[index] = response;
  }

  async function deleteQuestion(id: number, active: boolean) {
    const response = await AdminService.deleteQuestion(id, active);
    const index = surveyQuestions.value.findIndex(
      // @ts-ignore
      (question) => question.id === id,
    );
    if (response) {
      surveyQuestions.value[index] = response;
    }
    else {
      surveyQuestions.value.splice(index, 1);
    }
  }

  async function setSettings(settings: {
    wordDuration: number;
    instructions: string;
    endMessage: string;
  }, userId: number) {
    const response = await AdminService.setSettings(settings, userId);
    surveySettings.value = response;
  }

  return {
    surveyQuestions,
    createQuestion,
    getQuestions,
    setSettings,
    updateQuestion,
    deleteQuestion,
  };
});

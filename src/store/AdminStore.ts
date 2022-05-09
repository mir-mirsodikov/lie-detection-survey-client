import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AdminService } from '../services/AdminService';

export const useAdminStore = defineStore('admin', () => {
  const surveyQuestions = ref();

  async function createQuestion(question: string) {
    const response = await AdminService.createQuestion(question);
    surveyQuestions.value.push(response);
  }

  async function getQuestions() {
    surveyQuestions.value = await AdminService.getQuestions();
  }

  return {
    surveyQuestions,
    createQuestion,
    getQuestions,
  }
});
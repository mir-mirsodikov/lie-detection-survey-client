<template>
  <div class="uk-card uk-card-default uk-width-3-4 uk-card-hover uk-margin-auto uk-margin-top uk-margin-bottom">
    <div class="uk-card-header">
      <h3 class="uk-card-title">All survey questions</h3>
    </div>

    <div class="uk-card-body">
      <div uk-accordion="multiple: true">
        <li class="uk-open">
          <a class="uk-accordion-title" href="#">Active Questions</a>
          <div class="uk-accordion-content">
            <div v-for="question in questions" :key="question.id">
              <QuestionCard :question="question" v-if="question.active"></QuestionCard>
            </div>
          </div>
        </li>
        <li>
          <a class="uk-accordion-title" href="#">Inactive Questions</a>
          <div class="uk-accordion-content">
            <div v-for="question in questions" :key="question.id">
              <QuestionCard :question="question" v-if="!question.active"></QuestionCard>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAdminStore } from '../store/AdminStore';
import { useAuthStore } from '../store/auth';
import QuestionCard from './QuestionCard.vue';
const adminStore = useAdminStore();

const questions = ref<[{
  id: number,
  value: string,
  active: boolean,
}]>();

onMounted(async () => {
  const userId = useAuthStore().getUserId();
  await adminStore.getQuestions(userId);
  questions.value = adminStore.surveyQuestions;
});
</script>
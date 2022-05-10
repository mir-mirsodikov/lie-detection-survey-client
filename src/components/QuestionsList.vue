<template>
  <div class="uk-width-3-4 uk-section uk-section-default uk-card-hover uk-margin uk-margin-auto">
    <div class="uk-container">
      <h3>All questions</h3>

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
import QuestionCard from './QuestionCard.vue';
const adminStore = useAdminStore();

const questions = ref<[{
  id: number,
  value: string,
  active: boolean,
}]>();

onMounted(async () => {
  await adminStore.getQuestions();
  questions.value = adminStore.surveyQuestions;
});
</script>
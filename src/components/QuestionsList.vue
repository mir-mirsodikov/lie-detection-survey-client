<template>
  <div class="uk-width-3-4 uk-section uk-section-default uk-card-hover uk-margin-top uk-margin-auto">
    <div class="uk-container">
      <h3>All questions</h3>

      <div uk-accordion>
        <li class="uk-open">
          <a class="uk-accordion-title" href="#">Active Questions</a>
          <div class="uk-accordion-content">
            <div v-for="question in questions" :key="question.id">
              <div class="uk-card uk-card-default uk-card-body uk-margin uk-card-hover" v-if="question.active">
                <p>{{ question.value }}</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <a class="uk-accordion-title" href="#">Inactive Questions</a>
          <div class="uk-accordion-content">
            <div v-for="question in questions" :key="question.id">
              <div class="uk-card uk-card-default uk-card-body uk-margin uk-card-hover" v-if="!question.active">
                <p>{{ question.value }}</p>
              </div>
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
const adminStore = useAdminStore();

const questions = ref();

onMounted(async () => {
  await adminStore.getQuestions();
  questions.value = adminStore.surveyQuestions;
});
</script>
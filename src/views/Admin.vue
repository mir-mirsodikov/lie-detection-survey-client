<template>
  <div class="uk-margin uk-background-default" uk-grid>
    <div class="uk-width-expand uk-flex uk-flex-middle">
      <div>
        <h1 class="uk-padding">Admin Dashboard</h1>
      </div>
    </div>
    <div class="uk-margin uk-padding uk-grid-small uk-flex uk-flex-middle" uk-grid>
      <div>
        <!-- <button class="uk-button" @click="downloadQuestions">Download questions</button> -->
        <a class="uk-button uk-button-default" @click.prevent="downloadQuestions">Download questions</a>
      </div>
      <div>
        <button class="uk-button">Download responses</button>
      </div>
      <div>
        <button class="uk-button uk-button-primary">Sign out</button>
      </div>
    </div>
  </div>

  <NewQuestion></NewQuestion>
  <Settings></Settings>
  <QuestionsList></QuestionsList>
</template>

<script setup lang="ts">
import NewQuestion from '../components/NewQuestion.vue';
import QuestionsList from '../components/QuestionsList.vue';
import Settings from '../components/Settings.vue';
import { AdminService } from '../services/AdminService';

const downloadQuestions = async () => {
  const csvFile = await AdminService.downloadQuestions();
  const file = new Blob([csvFile], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = 'questions.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}
</script>
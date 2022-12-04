<template>
  <div class="uk-margin uk-background-default" uk-grid>
    <div class="uk-width-expand uk-flex uk-flex-middle">
      <div>
        <h1 class="uk-padding">Admin Dashboard</h1>
      </div>
    </div>
    <div class="uk-margin uk-padding uk-grid-small uk-flex uk-flex-middle" uk-grid>
      <div>
        <button class="uk-button uk-button-default" @click="downloadQuestions">Download questions</button>
      </div>
      <div>
        <button class="uk-button uk-button-default" @click.prevent="downloadResponses">Download responses</button>
      </div>
      <div>
        <button class="uk-button uk-button-primary" @click.prevent="signOut">Sign out</button>
      </div>
    </div>
  </div>

  <div class="uk-card uk-card-default uk-width-3-4 uk-margin-auto">
    <div class="uk-card-body">
      <h3>Welcome back, {{name}}</h3>
      <h4>Link to your <a :href="surveyUrl" target="_blank">survey</a>.</h4>
    </div>
  </div>
  <Settings></Settings>
  <NewQuestion></NewQuestion>
  <QuestionsList></QuestionsList>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import NewQuestion from '../components/NewQuestion.vue';
import QuestionsList from '../components/QuestionsList.vue';
import Settings from '../components/Settings.vue';
import router from '../router';
import { AdminService } from '../services/AdminService';
import { useAuthStore } from '../store/auth';

const name = ref<string>('');
const surveyUrl = ref<string>('');

const downloadQuestions = async () => {
  const csvFile = await AdminService.downloadQuestions();
  const file = new Blob([csvFile], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = 'questions.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

const downloadResponses = async () => {
  const csvFile = await AdminService.downloadResponses();
  const file = new Blob([csvFile], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = 'responses.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

const signOut = () => {
  useAuthStore().signOut();
  router.push('/login');
}

onMounted(async () => {
  const user = useAuthStore();
  if (user) {
    name.value = user.getName();
    const currentPath = document.URL.split('/');
    currentPath.pop();
    currentPath.push(`survey/${user.getUserId()}`);
    surveyUrl.value = currentPath.join('/');
  }
  console.log(surveyUrl.value);
});
</script>

<style>

</style>
<template>
  <div class="uk-margin uk-background-default" uk-grid>
    <div class="uk-width-expand uk-flex uk-flex-middle">
      <div>
        <h1 class="uk-padding">Admin Dashboard</h1>
      </div>
    </div>
    <div class="uk-margin uk-padding uk-flex uk-flex-middle">
      <div>
        <button class="uk-button uk-button-primary">Sign out</button>
      </div>
    </div>
  </div>

  <NewQuestion></NewQuestion>
  <QuestionsList></QuestionsList>
</template>

<script setup lang="ts">
import NewQuestion from '../components/NewQuestion.vue';
import QuestionsList from '../components/QuestionsList.vue';
</script>
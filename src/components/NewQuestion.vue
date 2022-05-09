<template>
  <div class="uk-card uk-card-default uk-card-hover uk-margin-auto uk-width-1-2">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Create new question</h3>
    </div>

    <div class="uk-card-body">
      <form class="uk-form-stacked" @submit.prevent="submit">
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <textarea class="uk-textarea" placeholder="Enter new question" v-model="newQuestion" />
          </div>

          <button class="uk-button uk-button-primary uk-align-right uk-margin-remove">Submit</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAdminStore } from '../store/AdminStore';

const newQuestion = ref();
const adminStore = useAdminStore();

async function submit() {
  await adminStore.createQuestion(newQuestion.value);
  newQuestion.value = '';
}

onMounted(async () => {
  await adminStore.getQuestions();
});
</script>
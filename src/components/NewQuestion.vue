<template>
  <div class="uk-card uk-card-default uk-card-hover uk-margin-auto uk-width-3-4">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Create new question</h3>
    </div>

    <div class="uk-card-body">
      <form class="uk-form-stacked" @submit.prevent="submit">
        <div class="uk-margin uk-form-controls">
          <textarea class="uk-textarea" rows="5" placeholder="Enter new question" v-model="newQuestion"></textarea>
        </div>

        <button class="uk-button uk-button-primary uk-align-right uk-margin-remove" :disabled="!newQuestion">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdminStore } from '../store/AdminStore';
import { useAuthStore } from '../store/auth';

const newQuestion = ref();
const adminStore = useAdminStore();

async function submit() {
  const userId = useAuthStore().getUserId();
  await adminStore.createQuestion(newQuestion.value, userId);
  newQuestion.value = '';
}
</script>
<template>
  <div class="uk-card uk-card-default uk-card-hover uk-margin-large-top uk-margin-auto uk-width-1-4"
    style="border-radius: 12px">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Participant information</h3>
    </div>
    <div class="uk-card-body">
      <form @submit.prevent="createParticipant">
        <div class="uk-margin">
          <input type="text" class="uk-input" placeholder="Name" v-model="name" />
        </div>

        <div class="uk-margin">
          <input type="email" class="uk-input" placeholder="Email" v-model="email" @click="error = ''" />
        </div>

        <div class="uk-margin">
          <select class="uk-select" v-model="gender">
            <option value="" selected disabled hidden>Select gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <button class="uk-button uk-button-primary uk-width-1-1">
          Continue
        </button>
      </form>
    </div>
    <div class="uk-card-footer" v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import router from '../router';
import { useSurveyStore } from '../store/SurveyStore';
import { useRoute } from 'vue-router';

const surveyStore = useSurveyStore();

const name = ref();
const email = ref();
const gender = ref('');
const error = ref();
const userId = ref<number>();

const createParticipant = async () => {
  if (!name.value || !email.value || !gender.value) {
    error.value = 'Missing required information';
    return;
  }
  console.log(userId.value);
  await surveyStore.createParticipant(name.value, email.value, gender.value);
  router.push({ path: `/survey/instructions/${userId.value}` });
}

onMounted(async () => {
  userId.value = parseInt(useRoute().params.userId as string);
});
</script>
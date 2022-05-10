<template>
  <div class="uk-card uk-card-default uk-card-hover uk-margin-large-top uk-margin-auto uk-width-1-4"
    style="border-radius: 12px">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Start</h3>
    </div>
    <div class="uk-card-body">
      <form>
        <div class="uk-margin">
          <input type="text" class="uk-input" placeholder="Name" v-model="name" />
        </div>

        <div class="uk-margin">
          <input type="email" class="uk-input" placeholder="Email" v-model="email" />
        </div>

        <div class="uk-margin">
          <select class="uk-select" v-model="gender">
            <option value="" selected disabled hidden>Select gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <button class="uk-button uk-button-primary uk-width-1-1" @click="createParticipant">
          Continue
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSurveyStore } from '../store/SurveyStore';

const surveyStore = useSurveyStore();

const name = ref();
const email = ref();
const gender = ref('');

const createParticipant = async () => {
  await surveyStore.createParticipant(name.value, email.value, gender.value);
}

</script>
<template>
  <div class="uk-margin-auto uk-margin-top">
    <div class="uk-card uk-card-default uk-width-1-5@l uk-width-1-4@m uk-width-1-3@s uk-align-center uk-margin-xlarge-top uk-card-hover">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Sign-In</h3>
      </div>

      <div class="uk-card-body">
        <form @submit.prevent="signIn">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <input type="text" class="uk-input" placeholder="username" v-model="username" />
            </div>

            <div class="uk-margin">
              <input type="password" class="uk-input" placeholder="password" v-model="password"/>
            </div>

            <button class="uk-button uk-button-primary uk-width-1-1">
              Sign-In
            </button>
          </fieldset>
        </form>
      </div>
      <div class="uk-card-footer" v-if="error">
        <p>{{ error }}</p> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useAuthStore } from '../store/auth';

const username = ref();
const password = ref();
const error = ref();

const authStore = useAuthStore();

async function signIn() {
  try {
    await authStore.signIn(username.value, password.value);
    error.value = '';
    router.push('/admin');
  }
  catch (e: any) {
    error.value = 'Incorrect username or password'; 
  }
}
</script>

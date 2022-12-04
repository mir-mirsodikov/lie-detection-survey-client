<template>
  <div class="uk-margin-auto uk-width-1-2">
    <div class="uk-card uk-card-default uk-card-hover uk-margin-auto uk-margin-top">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Lie Detection Survey Application</h3>
      </div>
      <div class="uk-card-body">
        <p>This is an application that is meant to allow for users to create a survey set and share with participants.
          Each survey prompt/question asks the participant how truthful the statement they read is.</p>
        <p>When a participant is filling out a survey, each survey question/prompt is shown to them word by word at a
          speed predetermined by the user.</p>
        <p>This allows for research to see how the speed of information consumption determines if we choose to believe
          it.
        </p>
      </div>
    </div>

    <div class="uk-margin-top uk-flex uk-flex-between">
      <div class="uk-card uk-card-default uk-card-body uk-card-hover uk-width-1-2 uk-margin-right">
        <p>Get started as a user and create your first survey set!</p>
        <button class="uk-button uk-button-primary" @click="routeToUser">Sign-up</button>
      </div>
      <div class="uk-card uk-card-default uk-card-body uk-card-hover uk-width-1-2">
        <p>Have a survey to take? Navigate to the URL given to you by the creator of the survey and get started!</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import router from '../router';

function routeToUser() {
  router.push({ path: '/signup' });
}
</script>
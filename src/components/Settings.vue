<template>
  <div class="uk-width-1-2 uk-margin uk-card uk-card-default uk-card-hover uk-margin-auto">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Settings</h3>
    </div>

    <div class="uk-card-body">
      <form class="uk-form-stacked">
        <div class="uk-margin">
          <label for="" class="uk-form-label">Words per minute</label>
          <div class="uk-form-controls">
            <input class="uk-input uk-width-1-4" type="text" placeholder="300">
          </div>

          <label for="" class="uk-margin uk-form-label">Instructions</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" rows="5"></textarea>
          </div>
        </div>

        <button class="uk-button uk-button-primary uk-align-right uk-margin-remove">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
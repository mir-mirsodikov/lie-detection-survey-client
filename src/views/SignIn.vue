<template>
  <div class="uk-margin-auto uk-margin-top">
    <div class="uk-card uk-card-default uk-width-1-5 uk-align-center uk-margin-xlarge-top uk-card-hover">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Sign-In</h3>
      </div>

      <div class="uk-card-body">
        <form>
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <input type="text" class="uk-input" placeholder="username" />
            </div>

            <div class="uk-margin">
              <input type="password" class="uk-input" placeholder="password" />
            </div>

            <button class="uk-button uk-button-primary uk-width-1-1">
              Sign-In
            </button>
          </fieldset>
        </form>
      </div>
      <div class="uk-card-footer">
        <p>Error</p> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

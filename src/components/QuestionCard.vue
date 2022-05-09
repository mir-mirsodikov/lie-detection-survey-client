<template>
  <div class="uk-card uk-card-default uk-margin uk-card-hover">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Question ID: {{ question.id }}</h3>
    </div>
    <div class="uk-card-body">
      <p>{{ question.value }}</p>
    </div>
    <div class="uk-card-footer">
      <div class="uk-align-right">
        <a uk-icon="file-edit" class="uk-icon-link uk-margin-right"></a>
        <a uk-icon="trash" class="uk-icon-link"></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  question: {
    id: number,
    value: string,
    active: boolean,
  }
}>();
</script>
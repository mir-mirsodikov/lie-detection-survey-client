<template>
  <div class="uk-card uk-card-default uk-margin uk-card-hover">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Question ID: {{ question.id }}</h3>
    </div>
    <div class="uk-card-body">
      <p v-if="!edit" @click="editQuestion" >{{ question.value }}</p>
      <textarea class="uk-textarea" v-model="question.value" v-if="edit" @keyup.enter="editQuestion"></textarea>
    </div>
    <div class="uk-card-footer">
      <div class="uk-align-right">
        <a uk-icon="file-edit" class="uk-icon-link uk-margin-right" @click="editQuestion"></a>
        <a uk-icon="trash" class="uk-icon-link"></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  question: {
    id: number,
    value: string,
    active: boolean,
  }
}>();

const edit = ref(false);

const editQuestion = () => {
  edit.value = !edit.value;
  
};
</script>
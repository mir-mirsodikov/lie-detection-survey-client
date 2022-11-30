<template>
  <div class="uk-card uk-card-default uk-margin uk-card-hover">
    <div class="uk-card-header">
      <h3 class="uk-card-title">Question ID: {{ question.id }}</h3>
    </div>
    <div class="uk-card-body">
      <p v-if="!edit" @click="editQuestion" >{{ value }}</p>
      <textarea class="uk-textarea" v-model="value" v-if="edit" @keyup.enter="submitQuestion" @keyup.esc="cancelUpdate"></textarea>
    </div>
    <div class="uk-card-footer">
      <div class="uk-align-right">
        <a uk-icon="file-edit" title="Edit question" class="uk-icon-link uk-margin-right" @click="editQuestion"></a>
        <a uk-icon="trash" title="Delete question" class="uk-icon-link" @click="deleteQuestion"></a>
        <a uk-icon="check" title="Reactivate question" class="uk-icon-link uk-margin-left" @click="reactivateQuestion" v-if="!question.active"></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdminStore } from '../store/AdminStore';

const adminStore = useAdminStore();

const props = defineProps<{
  question: {
    id: number,
    value: string,
    active: boolean,
  }
}>();

const edit = ref(false);
const value = ref(props.question.value);
const originalValue = ref(props.question.value);

const editQuestion = () => {
  originalValue.value = value.value;
  edit.value = !edit.value;
};

const reactivateQuestion = async () => {
  await adminStore.updateQuestion(props.question.id, value.value, true);
};

const submitQuestion = async () => {
  edit.value = false;
  value.value = value.value.trimEnd();
  await adminStore.updateQuestion(props.question.id, value.value, true);
}

const cancelUpdate = () => {
  edit.value = false;
  value.value = originalValue.value;
}

const deleteQuestion = async () => {
  await adminStore.deleteQuestion(props.question.id, !props.question.active);
}
</script>
<script setup>
defineProps({
  modelValue: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const onInput = (e) => {
  emit("update:modelValue", e.target.innerText);
}
</script>

<template>
  <v-card>
    <template #text>
      <div contenteditable="true" @input="onInput">{{ modelValue }}</div>
    </template>
    <template #actions>
      <v-toolbar density="compact" color="transparent">
        <v-spacer/>
        <v-btn icon="mdi-check-bold" />
        <v-btn icon="mdi-pencil" />
      </v-toolbar>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>

</style>
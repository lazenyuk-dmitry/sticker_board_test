<script setup>
defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  lock: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['update:modelValue', 'remove']);

const onInput = (e) => {
  emit("update:modelValue", e.target.innerText);
}
</script>

<template>
  <v-card>
    <template #text>
      <div :contenteditable="!lock" @input="onInput">{{ modelValue }}</div>
    </template>
    <template v-if="!lock" #actions>
      <v-toolbar density="compact" color="transparent">
        <v-spacer/>
        <v-btn icon="mdi-trash-can" @click="emit('remove')"/>
      </v-toolbar>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>

</style>
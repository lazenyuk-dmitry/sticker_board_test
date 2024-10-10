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
const input = ref();

const onInput = (e) => {
  emit("update:modelValue", e.target.innerText);
}
</script>

<template>
  <v-card class="d-flex flex-column" min-height="200">
    <v-card-text class="d-flex align-center justify-center h-auto">
      <div ref="input"
        class="pa-3 text-subtitle-2 text-center"
        :contenteditable="!lock"
        @input="onInput"
        @keypress.enter="input.blur()"
      >
        {{ modelValue }}
      </div>
    </v-card-text>
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
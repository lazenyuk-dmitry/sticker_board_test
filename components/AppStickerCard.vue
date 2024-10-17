<script setup>
import { debounce } from "@/utils";

defineProps({
  value: {
    type: String,
    required: false,
  },
  lock: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['input', 'remove']);
const input = ref();

const onInput = (e) => {
  emit("input", e.target.innerText);
}
const debouncedInput = debounce((e) => onInput(e), 300);
</script>

<template>
  <v-card class="d-flex flex-column" min-height="200">
    <v-card-text class="d-flex align-center justify-center h-auto">
      <div ref="input"
        class="pa-3 text-subtitle-2 text-center"
        :contenteditable="!lock"
        @input="debouncedInput"
        @keypress.enter="input.blur()"
      >
        {{ value }}
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
<script setup>
import { useMainStore } from '@/store/main';

const { add } = useMainStore();
const isOpen = ref(false);
const text = ref("");

const onSave = (e) => {
  isOpen.value = false;
  add(text.value);
}

const open = () => {
  isOpen.value = true;
}

defineExpose({
  open,
});
</script>

<template>
  <v-dialog
    v-model="isOpen"
    width="auto"
  >
    <v-card
      width="400"
      prepend-icon="mdi-update"
      title="Add new sticker card"
    >
      <template #text>
        <v-textarea v-model="text" label="Text"></v-textarea>
      </template>
      <v-divider></v-divider>
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Add"
          @click="onSave"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>

</style>
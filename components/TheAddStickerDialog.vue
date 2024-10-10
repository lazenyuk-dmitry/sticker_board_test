<script setup>
import { useMainStore } from '@/store/main';
import { required } from "@/utils/validation.js";

const { add } = useMainStore();
const isOpen = ref(false);
const isValid = ref(false);
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
      prepend-icon="mdi-pen-plus"
      title="Add new sticker card"
    >
      <template #text>
        <v-form
          v-model="isValid"
          @submit.prevent="onSave"
        >
          <v-textarea v-model="text" :rules="[required]" label="Text"></v-textarea>
          <v-divider class="my-4"/>
          <div class="d-flex justify-end">
            <v-btn
              text="Add"
              size="large"
              type="submit"
              :disabled="!isValid"
            />
          </div>

        </v-form>
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>

</style>
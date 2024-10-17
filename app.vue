<script setup>
import { useMainStore } from '@/store/main';
import { useHistoryStore } from '@/store/history';

const mainStore = useMainStore();
const historyStore = useHistoryStore();
const { isEdit } = storeToRefs(mainStore);
const { hasBack, hasNext } = storeToRefs(historyStore);
const addDialog = ref();

const onAdd = () => {
  addDialog.value.open();
}
const historyBack = () => {
  historyStore.back();
}
const historyNext = () => {
  historyStore.next();
}
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar>
        <v-spacer/>
        <template v-if="isEdit">
          <v-btn icon="mdi-undo" :disabled="!hasBack" @click="historyBack"/>
          <v-btn icon="mdi-redo" :disabled="!hasNext" @click="historyNext"/>
          <v-btn icon="mdi-plus-circle-outline" @click="onAdd"/>
          <v-btn icon="mdi-lock" @click="isEdit = false"/>
        </template>
        <v-btn v-else icon="mdi-pencil" @click="isEdit = true"/>
      </v-app-bar>
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>

    <!-- POPUP -->
    <TheAddStickerDialog ref="addDialog"/>
  </NuxtLayout>
</template>

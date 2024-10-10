<script setup>
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();
const { restore, save } = mainStore;
const { isEdit } = storeToRefs(mainStore);
const addDialog = ref();

const onAdd = () => {
  addDialog.value.open();
}

onBeforeMount(() => {
  restore();

  window.addEventListener("beforeunload", (e) => {
    save();
  });
})
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar>
        <v-spacer/>
        <template v-if="isEdit">
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

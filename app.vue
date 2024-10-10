<script setup>
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();
const { restore, save } = mainStore;
const { isEdit } = storeToRefs(mainStore);

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
        <v-btn v-if="isEdit" icon="mdi-lock" @click="isEdit = false"/>
        <v-btn v-else icon="mdi-pencil" @click="isEdit = true"/>
      </v-app-bar>
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

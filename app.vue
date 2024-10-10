<script setup>
import { useMainStore } from '@/store/main';

const { data } = useMainStore();
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar>
        <v-spacer/>
        <v-btn icon="mdi-pencil" />
      </v-app-bar>
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();
const { del } = mainStore;
const { data, isEdit } = storeToRefs(mainStore);
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(card, index) in data"
        :key="index"
        cols="4"
      >
        <AppStickerCard
          v-model="data[index]"
          :lock="!isEdit"
          @remove="del(index)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();
const { del } = mainStore;
const { data, isEdit } = storeToRefs(mainStore);
const addDialog = ref();

const onAdd = () => {
  addDialog.value.open();
}
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
      <v-col
        v-if="isEdit"
        cols="4"
      >
        <v-btn
          height="100"
          width="100"
          @click="onAdd"
        >
          <v-icon icon="mdi-plus-circle-outline" size="x-large"/>
        </v-btn>
      </v-col>
    </v-row>

    <TheAddStickerDialog ref="addDialog"/>
  </v-container>
</template>
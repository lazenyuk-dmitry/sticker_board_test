<script setup>
import { useMainStore } from '@/store/main';

const { data } = useMainStore();
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
        <AppStickerCard v-model="data[index]"></AppStickerCard>
      </v-col>
      <v-col
        cols="4"
      >
        <v-card height="100" link @click="onAdd">
          <template #text>
            <span class="text-center">
              +
            </span>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <TheAddStickerDialog ref="addDialog"/>
  </v-container>
</template>
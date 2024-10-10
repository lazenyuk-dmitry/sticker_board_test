import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const data = ref([
    "Card 1",
    "Card 2"
  ]);

  const save = (d) => {
    data.value = d;
  }

  const add = (text) => {
    data.value.push(text);
  }

  const del = (index) => {
    data.value.splice(index, 1);
  }

  return {
    data,
    save,
    add,
    del,
  }
})

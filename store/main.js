import { defineStore } from 'pinia';
import { setItem, getItem } from "@/utils/localStore";

const LOCAL_DATA_KEY = "localDataKey";

export const useMainStore = defineStore('mainStore', () => {
  const data = ref([
    "Card 1",
    "Card 2"
  ]); // Default data.

  const isEdit = ref(false);

  // Restore from localStore
  const restore = () => {
    const localData = getItem(LOCAL_DATA_KEY);
    if (localData && Array.isArray(localData)) {
      data.value = localData;
    }
  }

  const save = () => {
    setItem(LOCAL_DATA_KEY, data.value);
  }

  const add = (text) => {
    data.value.push(text);
    save();
  }

  const del = (index) => {
    data.value.splice(index, 1);
    save();
  }

  return {
    isEdit,
    data,
    save,
    add,
    del,
    restore,
  }
})

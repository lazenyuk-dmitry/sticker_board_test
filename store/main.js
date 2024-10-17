import { defineStore } from 'pinia';
import { setItem, getItem } from "@/utils/localStore";
import { ACTIONS, useHistoryStore } from "@/store/history.js";

const LOCAL_DATA_KEY = "localDataKey";

export const useMainStore = defineStore('mainStore', () => {
  const historyStore = useHistoryStore();
  const broadCast = new BroadcastChannel('mainStore');
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
  restore();

  // Sync beetwin tabs. Handle message.
  broadCast.onmessage = (e) => {
    if (e.target.name === 'mainStore') {
      data.value = e.data.data;
    }
  };

  const save = () => {
    setItem(LOCAL_DATA_KEY, data.value);

    // Sync beetwin tabs. Send message.
    broadCast.postMessage({
      type: 'dataChange',
      data: [...data.value],
    });
  }

  const add = (text) => {
    const length = data.value.push(text);
    historyStore.add(length - 1, text, ACTIONS.ADD);
    save();
  }

  const del = (index) => {
    const delItem = data.value.splice(index, 1);
    historyStore.add(index, delItem[0], ACTIONS.DEL);
    save();
  }

  const changeCard = (index, text) => {
    data.value[index] = text;
    historyStore.add(index, text, ACTIONS.EDIT);
    save();
  }

  return {
    isEdit,
    data,
    save,
    add,
    del,
    restore,
    changeCard,
  }
})

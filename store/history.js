import { defineStore } from 'pinia';
import { useMainStore } from "@/store/main.js";

export const ACTIONS = {
  EDIT: "EDIT",
  ADD: "ADD",
  DEL: "DEL",
};

class HistoryItem {
  index;
  data;
  action;

  constructor(index, data, action) {
    this.index = index;
    this.data = data;
    this.action = action;
  }
}

class HistoryItemAdd extends HistoryItem {
  constructor(index, data) {
    super(index, data, ACTIONS.ADD);
  }

  restore(target) {
    target.splice(this.index, 1);
  }

  undo(target) {
    target.splice(this.index, 0, this.data);
  }
}

class HistoryItemRemove extends HistoryItem {
  constructor(index, data) {
    super(index, data, ACTIONS.DEL);
  }

  restore(target) {
    target.splice(this.index, 0, this.data);
  }

  undo(target) {
    target.splice(this.index, 1);
  }
}

class HistoryItemEdit extends HistoryItem {
  previousState;

  constructor(index, data) {
    super(index, data, ACTIONS.EDIT);
  }

  restore(target) {
    this.previousState = target[this.index];
    target[this.index] = this.data;
  }

  undo(target) {
    target[this.index] = this.previousState;
  }
}

class HistoryFabric {
  create(index, data, action) {
    switch (action) {
      case ACTIONS.ADD:
        return new HistoryItemAdd(index, data);
      case ACTIONS.DEL:
        return new HistoryItemRemove(index, data);
      case ACTIONS.EDIT:
        return new HistoryItemEdit(index, data);
      default:
        break;
    }
  }
}

export const useHistoryStore = defineStore('historyStore', () => {
  const mainStore = useMainStore();
  const historyFabric = new HistoryFabric();
  const history = ref([]);
  const currentIndex = ref(-1);

  const add = (index, text, action) => {
    history.value = history.value.slice(0, currentIndex.value + 1);
    const length = history.value.push(historyFabric.create(index, text, action));
    currentIndex.value = length - 1;
  };

  const hasBack = computed(() => currentIndex.value >= 0);
  const hasNext = computed(() => currentIndex.value < history.value.length - 1);

  const back = () => {
    if (!hasBack) return;
    history.value[currentIndex.value].restore(mainStore.data);
    currentIndex.value = currentIndex.value - 1;
    mainStore.save();
  }
  const next = () => {
    if (!hasNext) return;
    currentIndex.value = currentIndex.value + 1;
    history.value[currentIndex.value].undo(mainStore.data);
    mainStore.save();
  }


  return {
    add,
    back,
    next,
    hasBack,
    hasNext,
  };
})
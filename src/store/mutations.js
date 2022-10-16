import { LocalStorageKeys } from "@/constants/local-storage-keys";

export default {
  setItems(state, items) {
    state.items = items;
    localStorage.setItem(LocalStorageKeys.items, JSON.stringify(items));
  },
  addItem(state, item) {
    const objItem = { ...item, id: state.items.length + 1 };
    state.items.push(objItem);
    localStorage.setItem(LocalStorageKeys.items, JSON.stringify(state.items));
  },
  addItemsInLocal(state, items) {
    state.items = items;
  },
};

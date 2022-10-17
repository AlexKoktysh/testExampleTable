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
  setSelectedItem(state, items) {
    state.selectItems = items;
  },
  deleteItem(state, items) {
    const itemsId = items.map((el) => el.id);
    state.items = state.items.filter((el) => !itemsId.includes(el.id));
    localStorage.setItem(LocalStorageKeys.items, JSON.stringify(state.items));
  },
  setSearchItemsCounter(state, value) {
    state.searchItemsCounter = value;
  },
};

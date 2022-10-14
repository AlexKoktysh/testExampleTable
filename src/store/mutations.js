import { LocalStorageKeys } from "@/constants/local-storage-keys";

export default {
  setItems(state, items) {
    debugger;
    state.items = items;
    debugger;
    localStorage.setItem(LocalStorageKeys.items, JSON.stringify(items));
  },
};

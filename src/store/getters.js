import { LocalStorageKeys } from "@/constants/local-storage-keys";

export default {
  get_items: () => {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.items));
  },
};

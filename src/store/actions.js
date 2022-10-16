import { getItem } from "@/API/api";
export default {
  getItems: async function ({ commit }) {
    try {
      const res = await getItem();
      res && commit("setItems", res);
    } catch (err) {
      console.error(err);
    }
  },
  addItem: async function ({ commit }, item) {
    try {
      commit("addItem", item);
    } catch (err) {
      console.error(err);
    }
  },
  setItems: async function (store) {
    try {
      const res = store.getters.get_items;
      res && store.commit("addItemsInLocal", res);
    } catch (err) {
      console.error(err);
    }
  },
};

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
  getItemsInLocal: async function (store) {
    try {
      const res = store.getters.get_items;
      res && store.commit("addItemsInLocal", res);
    } catch (err) {
      console.error(err);
    }
  },
  deleteItem: async function ({ commit }, items) {
    try {
      commit("deleteItem", items);
      commit("setSelectedItem", []);
    } catch (err) {
      console.error(err);
    }
  },
  setSelectedItem: async function ({ commit }, items) {
    try {
      commit("setSelectedItem", items);
    } catch (err) {
      console.error(err);
    }
  },
  setSearchItemsCounter: async function ({ commit }, value) {
    try {
      commit("setSearchItemsCounter", value);
    } catch (err) {
      console.error(err);
    }
  },
};

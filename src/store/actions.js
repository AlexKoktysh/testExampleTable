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
};

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const app = createApp(App);

const requireComponent = require.context(
  "./components",
  false,
  /[a-z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app.component("easy-data-table", Vue3EasyDataTable);

app.use(store).mount("#app");

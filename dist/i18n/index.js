import {register, init} from "../../web_modules/svelte-i18n.js";
export function setupI18n() {
  register("en", () => import("./en.json.proxy.js"));
  register("ru", () => import("./ru.json.proxy.js"));
  init({
    fallbackLocale: "en",
    initialLocale: "ru"
  });
}

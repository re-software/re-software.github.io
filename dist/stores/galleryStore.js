import {readable} from "../../web_modules/svelte/store.js";
import tea from "./tea_small.json.proxy.js";
let galleryStore = readable([], function start(set) {
  set(tea);
  return function stop() {
  };
});
export {galleryStore};

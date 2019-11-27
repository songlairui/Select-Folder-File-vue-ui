import Vue from "vue";
import VueUi from "@vue/ui";
import * as Filters from "./filters";
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import Focus from './util/focus'


Vue.use(VueUi);

for (const key in Filters) {
  Vue.filter(key, Filters[key]);
}

Vue.directive('focus', Focus)

Vue.use(VueVirtualScroller);


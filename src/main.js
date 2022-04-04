// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
import "vue-search-select/dist/VueSearchSelect.css";
import "vue-slider-component/theme/default.css";
import VueRouter from "vue-router";
import titleMixin from "./titleMixin";
import VueClipboard from "vue-clipboard2";
import VueCryptojs from "vue-cryptojs";
import KProgress from "k-progress";
import VideoBg from "vue-videobg";
import VModal from "vue-js-modal";
import store from "./store/index.js";
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueAgile from 'vue-agile'
import VueTippy, { TippyComponent } from "vue-tippy";
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
// import "./assets/style/toastification.scss"
import PrimeVue from 'primevue/config';
import Galleria from 'primevue/galleria';
import Carousel from 'primevue/carousel';
import money from 'v-money'
import VueKinesis from 'vue-kinesis'
import Toolbar from 'vue-js-toolbar'
import VueCarousel from 'vue-carousel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
}

Vue.use(Toolbar);
Vue.use(VueKinesis);
Vue.use(Toast, options);
Vue.use(money, {
  decimal: ".",
  thousands: ",",
  prefix: "",
  suffix: "",
  precision: 0,
  masked: true,
  min: 1,
  max: 10000000000
})
Vue.use(VueTippy);
Vue.use(VueCryptojs);
Vue.mixin(titleMixin);
Vue.use(VueClipboard);
Vue.use(VueRouter);
Vue.use(VueYouTubeEmbed)
Vue.component('Column', Column);
Vue.component('DataTable', DataTable);
Vue.component("k-progress", KProgress);
Vue.component("video-bg", VideoBg);
// Vue.component("Galleria", Galleria);
Vue.config.productionTip = false;
Vue.use(VModal, { componentName: "modal" });
Vue.use( VueAgile );

Vue.use(VueCarousel);
Vue.component("tippy", TippyComponent);
Vue.component("Galleria", Galleria);
Vue.component("Carousel", Carousel);
Vue.use(PrimeVue);

Vue.filter('two_digits', (value) => {
	if (value < 0) {
		return '00';
	}
	if (value.toString().length <= 1) {
		return `0${value}`;
	}
	return value;
});

Vue.filter('numberWithCommas', (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

Vue.filter('shortAddress', (wallet) => {
  return wallet.substring(0, 6)+"..."+wallet.slice(-4);
});

import HomeV3 from "./views/websitenew/index.vue";
import Token from "./views/websitenew/token.vue";

export const routes = [
  {
    path: "/",
    component: HomeV3,
  },
  {
    path: "/token",
    component: Token,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

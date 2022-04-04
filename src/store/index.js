import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isSidebar: false,
    isSideMenu: false,
    card: {},
    cards: [],
    range: [0, 0],
    maxRange: 0,
    emailSignup:''
  },
  mutations: {
    setSidebar: (state, payload) => {
      state.isSidebar = payload;
    },
    setSideMenu: (state, payload) => {
      state.isSideMenu = payload;
    },
    setCard: (state, payload) => {
      state.card = payload;
    },
    setCards: (state, payload) => {
      state.cards = payload;
    },
    setRangeValue: (state, payload) => {
      state.range = payload;
    },
    setMaxRange: (state, payload) => {
      state.maxRange = payload;
    },
    setEmail: (state, payload) => {
      state.emailSignup = payload;
    },
  },
  actions: {
    setSidebar: (state, payload) => {
      state.commit("setSidebar", payload);
    },
    setSideMenu: (state, payload) => {
      state.commit("setSideMenu", payload);
    },
    setCard: (state, payload) => {
      state.commit("setCard", payload);
    },
    setCards: (state, payload) => {
      state.commit("setCards", payload);
    },
    setRangeValue: (state, payload) => {
      state.commit("setRangeValue", payload);
    },
    setMaxRange: (state, payload) => {
      state.commit("setMaxRange", payload);
    },
  },
  modules: {},
  getters: {
    getSidebar: (state) => state.isSidebar,
    getSideMenu: (state) => state.isSideMenu,
    getCard: (state) => state.card,
    getCards: (state) => state.cards,
    getRangeValue: (state) => state.range,
    getMaxRange: (state) => state.maxRange,
  },
});

export default store;

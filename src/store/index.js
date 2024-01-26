import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    vuexWordString: [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
    vuexIndex: 0,
    vuexCheckedString: false, // 前輸入值是否為字典內字串 ,false = 能刪字母,
    vuexEnterEvent: 1,
  },
  getters: {
    getterVuexWordString(state) {
      return state.vuexWordString;
    },
    getterVuexIndex(state) {
      return state.vuexIndex;
    },
    getterVuexCheckedString(state) {
      return state.vuexCheckedString;
    },
    getterVuexEnterEvent(state) {
      return state.vuexEnterEvent;
    },
  },
  mutations: {
    UPDATE_WORD_STRING(state, payload) {
      state.vuexWordString = payload;
      // console.log("payload", payload);
      // console.log("vuexIndex", state.vuexIndex);
      // state.vuexWordString[state.vuexIndex][1] = payload;
      // console.log(state.vuexWordString);
    },
    UPDATE_INDEX(state, payload) {
      state.vuexIndex = payload;
    },
    UPDATE_CHECK_STRING(state, payload) {
      state.vuexCheckedString = payload;
    },
    UPDATE_ENTER_EVENT(state, payload) {
      state.vuexEnterEvent = payload;
    },
  },
  actions: {
    actionWordString(context, payload) {
      context.commit("UPDATE_WORD_STRING", payload);
    },
    actionIndex(context, payload) {
      context.commit("UPDATE_INDEX", payload);
    },
    actionCheckedString(context, payload) {
      context.commit("UPDATE_CHECK_STRING", payload);
    },
    actionEnterEvent(context, payload) {
      context.commit("UPDATE_ENTER_EVENT", payload);
    },
  },
  modules: {},
});

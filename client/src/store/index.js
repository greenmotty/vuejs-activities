import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      movie: {
        score: false,
        zoom: false,
      },
      quiz: {
        score: true,
        zoom: true,
      },
      easy_quiz: {
        score: true,
        zoom: true,
      },
      challenge: {
        score: false,
        zoom: false,
      },
      make_a_map: {
        score: false,
        zoom: true,
      },
      make_a_movie: {
        score: false,
        zoom: true,
      },
      word_play: {
        score: false,
        zoom: true,
      },
      related_reading: {
        score: false,
        zoom: false,
      },
      draw_about_it: {
        score: false,
        zoom: true,
      },
    },
  },
  getters: {
    getSettings(state) {
      return state.settings;
    },
  },
  mutations: {},
  actions: {},
});

/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import fetch from 'isomorphic-fetch';
import { port } from '@/../package.json';

const API_ORIGIN = process.env.NODE_ENV === 'production' ? '/api' : `//localhost:${port}/api`;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    me: {},
    todos: [],
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload;
    },

    setTodo(state, payload) {
      state.todos = payload;
    },

    addTodo(state, payload) {
      state.todos.unshift(payload);
    },

    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },

    editTodo(state, { id, value }) {
      state.todos.find(todo => todo.id === id).msg = value;
    },
  },
  actions: {
    async getMe({ commit }) {
      const user = await fetch(`${API_ORIGIN}/users/me`)
        .then(res => res.json());
      commit('setMe', user[0]);
    },

    async getTodos({ commit }) {
      const todos = await fetch(`${API_ORIGIN}/todos`)
        .then(res => res.json());

      commit('setTodo', todos);
    },

    async appendTodo({ commit }, payload) {
      const todo = await fetch(`${API_ORIGIN}/todos/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (todo) {
        commit('addTodo', payload);
      }
    },

    async deleteTodo({ commit }, { id }) {
      const res = await fetch(`${API_ORIGIN}/todos/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res) {
        commit('removeTodo', id);
      }
    },

    async editTodo({ commit }, payload) {
      const todo = await fetch(`${API_ORIGIN}/todos/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (todo) {
        commit('editTodo', payload);
      }
    },
  },
});

export default store;

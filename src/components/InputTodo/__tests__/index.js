import Vue from 'vue';
import store from '@/store';
import InputTodo from '../';

store.dispatch = () => {};
// do not dispatch any actions

test('default value should be empty', () => {
  const data = InputTodo.data();

  expect(data.value).toBe('');
});

test('check the store is correctly passed', () => {
  const inputTodo = new Vue(InputTodo);
  inputTodo.$store = store;

  expect(inputTodo.$store.state.me).toBeTruthy();
  expect(inputTodo.$store.state.todos).toBeTruthy();
});

test('clear the input value after submitted', () => {
  const inputTodo = new Vue({
    ...InputTodo,
    store,
  }).$mount();
  const ele = inputTodo.$el.querySelector('input[type="text"]');

  inputTodo.value = 'value';
  expect(inputTodo.value).toBe('value');
  expect(ele.value).toBe('value');

  inputTodo.handleSubmit();
  expect(inputTodo.value).toBe('');
  expect(ele.value).toBe('');
});

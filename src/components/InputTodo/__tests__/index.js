import Vue from 'vue';
import store from '@/store';
import InputTodo from '../';

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
  const inputTodo = new Vue(InputTodo);
  inputTodo.$store = store;

  inputTodo.value = 'value';
  inputTodo.handleSubmit();

  expect(inputTodo.value).toBe('');
});

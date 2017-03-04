import Vue from 'vue';
import InputTodo from '../';

test('default value should be empty', () => {
  const vm = new Vue(InputTodo).$mount();

  expect(vm.value).toBe('');
});

test('change input value whenever prop value changed', async () => {
  const vm = new Vue(InputTodo).$mount();
  const input = vm.$el.querySelector('input[type="text"]');

  vm.value = 'value';
  await Vue.nextTick();
  expect(vm.value).toBe('value');
  expect(input.value).toBe('value');

  vm.value = '';
  await Vue.nextTick();
  expect(vm.value).toBe('');
  expect(input.value).toBe('');
});

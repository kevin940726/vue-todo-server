<template>
  <div class="box todolist">
    <InputTodo />

    <div>
      <div v-for="(todo, index) in todos">
        <Todo :id="todo.id" :index="index" :name="todo.name" :avatar="todo.avatar" :msg="todo.msg"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputTodo from './InputTodo';
import Todo from './Todo';

export default {
  name: 'TodoList',
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
  components: {
    InputTodo,
    Todo,
  },
};
</script>

<style>
.todolist {
  width: 100%;
  max-width: 480px;
}
</style>

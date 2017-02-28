<template>
  <div class="box todolist">
    <input-todo/>

    <div>
      <div v-for="(todo, index) in todos">
        <todo :id="todo.id" :index="index" :name="todo.name" :avatar="todo.avatar" :msg="todo.msg"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputTodo from './InputTodo';
import Todo from './Todo';

export default {
  name: 'todo-list',
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

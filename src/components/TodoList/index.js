import InputTodo from '@/containers/InputTodo';
import Todo from '@/containers/Todo';

import styles from './index.css';

export default {
  name: 'TodoList',

  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },

  render(h) {
    const { todos } = this;

    return (
      <div class={`box ${styles.todolist}`}>
        <InputTodo />

        <div>
          {todos.map((todo, index) => (
            <Todo {...{ props: todo }} index={index} />
          ))}
        </div>
      </div>
    );
  },
};

import Todo from '@/components/Todo';

export default {
  name: 'Todo',

  props: {
    id: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    msg: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleDelete(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      this.$store.dispatch('deleteTodo', {
        id: this.id,
        index: this.index,
      });
    },
  },

  render(h) {
    return (
      <Todo
        name={this.name}
        avatar={this.avatar}
        msg={this.msg}
        handleDelete={this.handleDelete}
      />
    );
  },
};

import Todo from '@/components/Todo';

export default {
  name: 'Todo',

  props: {
    id: {
      type: String,
      default: '',
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

  data() {
    return {
      isEditable: false,
      value: this.msg,
    };
  },

  methods: {
    handleDelete(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      this.$store.dispatch('deleteTodo', {
        id: this.id,
      });
    },

    handleEditableToggle(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      this.isEditable = true;
    },

    async handleSubmit(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      await this.$store.dispatch('editTodo', {
        id: this.id,
        value: this.value,
      });

      this.isEditable = false;
    },

    handleEdit(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      this.value = e.target.value;
    },
  },

  render(h) {
    return (
      <Todo
        name={this.name}
        avatar={this.avatar}
        msg={this.msg}
        value={this.value}
        isEditable={this.isEditable}
        handleDelete={this.handleDelete}
        handleEditableToggle={this.handleEditableToggle}
        handleSubmit={this.handleSubmit}
        handleEdit={this.handleEdit}
      />
    );
  },
};

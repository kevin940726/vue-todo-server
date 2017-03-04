import InputTodo from '@/components/InputTodo';

export default {
  name: 'InputTodo',

  data() {
    return {
      value: '',
    };
  },

  computed: {
    name() {
      const { me } = this.$store.state;
      if (me && me.name) {
        return `${me.name.first} ${me.name.last}`;
      }

      return '';
    },

    avatar() {
      const { me } = this.$store.state;
      if (me && me.picture) {
        return me.picture.thumbnail;
      }

      return null;
    },
  },

  methods: {
    handleSubmit(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      if (this.value) {
        this.$store.dispatch('appendTodo', {
          name: this.name,
          avatar: this.avatar,
          msg: this.value,
          id: `${this.name}_${Date.now()}`,
        });

        this.value = '';
      }
    },

    handleChange(e) {
      this.value = e.target.value;
    },
  },

  render(h) {
    return (
      <InputTodo
        name={this.name}
        avatar={this.avatar}
        value={this.value}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  },
};

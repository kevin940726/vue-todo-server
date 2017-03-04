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
        this.$refs.input.value = '';
      }
    },

    handleChange(e) {
      this.value = e.target.value;
    },
  },

  render(h) {
    const { avatar, name, value, handleChange, handleSubmit } = this;

    return (
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={avatar} alt="Image"/>
            </figure>
          </div>

          <div class="media-content">
            <div class="content">
              <p>
                <strong>{ name }</strong>
              </p>

              <form onSubmit={handleSubmit}>
                <p class="control has-addons">
                  <input
                    class="input is-expanded"
                    type="text"
                    placeholder="enter todo..."
                    ref="input"
                    value={value}
                    onChange={handleChange}
                  />
                  <button type="submit" class="button is-primary">Submit</button>
                </p>
              </form>
            </div>
          </div>
        </article>
      </div>
    );
  },
};

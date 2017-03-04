export default {
  name: 'InputTodo',

  props: {
    name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    handleChange: {
      type: Function,
      default: () => {},
    },
    handleSubmit: {
      type: Function,
      default: () => {},
    },
  },

  watch: {
    value() {
      this.$refs.input.value = this.value;
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
                    onInput={handleChange}
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

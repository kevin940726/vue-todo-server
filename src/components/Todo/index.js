export default {
  name: 'Todo',

  props: {
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
    value: {
      type: String,
      default: '',
    },
    handleDelete: {
      type: Function,
      default: () => {},
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    handleEditableToggle: {
      type: Function,
      default: () => {},
    },
    handleSubmit: {
      type: Function,
      default: () => {},
    },
    handleEdit: {
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
    const {
      avatar,
      name,
      msg,
      handleDelete,
      isEditable,
      handleEditableToggle,
      handleSubmit,
      handleEdit,
    } = this;

    return (
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src={avatar} alt={name} />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{ name }</strong>
                <br/>
                {
                  isEditable ? (
                    <form onSubmit={handleSubmit}>
                      <p class="control has-addons">
                        <input
                          class="input"
                          type="text"
                          placeholder="enter todo..."
                          ref="input"
                          value={msg}
                          onInput={handleEdit}
                        />
                        <button type="submit" class="button is-primary">Submit</button>
                      </p>
                    </form>
                  ) : (
                    <span onClick={handleEditableToggle}>{msg}</span>
                  )
                }
              </p>
            </div>

            <nav class="level">
              <div class="level-left">
                <a class="level-item" onClick={handleDelete}>
                  <span class="icon is-small"><i class="fa fa-trash"></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    );
  },
};

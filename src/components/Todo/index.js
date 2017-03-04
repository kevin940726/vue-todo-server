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
    handleDelete: {
      type: Function,
      default: () => {},
    },
  },

  render(h) {
    const { avatar, name, msg, handleDelete } = this;

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
                { msg }
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

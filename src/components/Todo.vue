<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="avatar" :alt="name">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ name }}</strong>
            <br>
            {{ msg }}
          </p>
        </div>

        <nav class="level">
          <div class="level-left">
            <a class="level-item" v-on:click.prevent="onDelete">
              <span class="icon is-small"><i class="fa fa-trash"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    id: {
      type: String,
    },
    index: {
      type: Number,
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
    onDelete() {
      this.$store.dispatch('deleteTodo', {
        id: this.id,
        index: this.index,
      });
    },
  },
};
</script>

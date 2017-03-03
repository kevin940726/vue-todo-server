import './index.css';

export default {
  name: 'app',
  render(h) {
    return (
      <div id="app" class="container">
        <router-view></router-view>
      </div>
    );
  },
};

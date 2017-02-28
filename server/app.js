/* eslint-disable no-param-reassign */
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const fetch = require('isomorphic-fetch');
const convert = require('koa-convert');
const cors = require('kcors');
const serve = require('koa-static');
const pkg = require('../package.json');

const PORT = pkg.port || 3000;

const app = new Koa();
const router = new Router();

const store = {
  users: [],
  todos: [],
};

async function fetchUsers() {
  const result = await fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json());

  store.users.push(...result.results);
  store.info = result.info;
  return store;
}

router.prefix('/api');

router.get('/users', (ctx, next) => {
  ctx.body = store.users;
  return next();
});

router.get('/users/me', async (ctx, next) => {
  if (!store.users.length) {
    await fetchUsers();
  }
  const index = Math.floor(Math.random() * store.users.length);
  const user = store.users.splice(index, 1);
  ctx.body = user;

  return next();
});

router.get('/todos', (ctx, next) => {
  ctx.body = store.todos;

  return next();
});

router.post('/todos/new', async (ctx, next) => {
  await next();
  const todo = ctx.request.body;
  store.todos.unshift(todo);
  ctx.body = todo;
});

router.del('/todos/remove', async (ctx, next) => {
  await next();
  const id = ctx.request.body.id;

  const index = store.todos.findIndex(todo => todo.id === id);
  store.todos.splice(index, 1);

  ctx.body = { id };
});

app.use(convert(cors()));
app.use(router.routes());
app.use(serve('dist'));
app.use(router.allowedMethods());
app.use(bodyParser());
app.use(logger());

app.listen(PORT);

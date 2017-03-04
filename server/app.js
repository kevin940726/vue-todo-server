/* eslint-disable no-param-reassign */
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const fetch = require('isomorphic-fetch');
const convert = require('koa-convert');
const cors = require('kcors');
const serve = require('koa-static');
const { port } = require('../package.json');

const PORT = port || 3000;

const app = new Koa();
const router = new Router();

const store = {
  users: [],
  todos: {},
  todosOrder: [],
  todoId: 0,

  getTodos() {
    return this.todosOrder.map(id => this.todos[id]);
  },

  newTodo(todo) {
    const newTodo = Object.assign({}, todo, {
      id: this.todoId.toString(),
    });

    this.todosOrder.unshift(newTodo.id);
    this.todos[newTodo.id] = newTodo;

    this.todoId += 1;

    return newTodo;
  },

  deleteTodo(id) {
    delete this.todos[id];

    this.todosOrder = this.todosOrder.filter(i => i !== id);

    return id;
  },

  updateTodo(todo) {
    this.todos[todo.id] = Object.assign({}, this.todos[todo.id], {
      msg: todo.value,
    });

    return todo;
  },
};

async function fetchUsers() {
  const { results } = await fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json());

  store.users.push(...results);
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
  ctx.body = store.getTodos();

  return next();
});

router.post('/todos/new', async (ctx, next) => {
  await next();

  const todo = ctx.request.body;

  ctx.body = store.newTodo(todo);
});

router.del('/todos/remove', async (ctx, next) => {
  await next();
  const id = ctx.request.body.id;

  ctx.body = { id: store.deleteTodo(id) };
});

router.post('/todos/update', async (ctx, next) => {
  await next();
  const todo = ctx.request.body;

  ctx.body = store.updateTodo(todo);
});

app.use(convert(cors()));
app.use(router.routes());
app.use(serve('dist'));
app.use(router.allowedMethods());
app.use(bodyParser());
app.use(logger());

app.listen(PORT);

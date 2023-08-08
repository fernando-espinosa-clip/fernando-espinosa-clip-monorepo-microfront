import { rest } from 'msw';
import { blogs } from './data/blogs';
import { users } from './data/users';
import { mainData } from './data/dashboard';
import { products } from './data/products';
import { orders } from './data/orders';
import { customers1 } from './data/customers';
import subMinutes from 'date-fns/subMinutes';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
const sortProductsByUpdatedAt = (a, b) => {
  if (a.updatedAt > b.updatedAt) {
    return -1;
  }
  if (a.updatedAt < b.updatedAt) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

const waitFor = (result, timeout = 2000) => new Promise((r) => setTimeout(() => r(result), timeout));

export const handlers = [
  rest.get('/api/blogs', (req, res, ctx) => {
    return res(ctx.json(blogs));
  }),
  rest.post('/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const userFound = users.find((u) => u.email === email && u.password === password);
    if (userFound) {
      return res(ctx.json(userFound.uuid));
    }
    return res(
      // Send a valid HTTP status code
      ctx.status(403),
      // And a response body, if necessary
      ctx.json({
        errorMessage: `User '${email}' not found`,
      })
    );
  }),
  rest.get('/api/dashboard', async (req, res, ctx) => {
    const response = await waitFor(mainData, getRandomArbitrary(1000, 2500));
    return res(ctx.json(response));
  }),
  rest.get('/api/products/latest', async (req, res, ctx) => {
    products.sort(sortProductsByUpdatedAt);
    const result = products.slice(0, 5);
    const response = await waitFor(result, getRandomArbitrary(500, 3000));
    return res(ctx.json(response));
  }),
  rest.get('/api/orders/latest', async (req, res, ctx) => {
    const response = await waitFor(orders, getRandomArbitrary(700, 2500));
    return res(ctx.json(response));
  }),
];

import { rest } from 'msw';
import { blogs } from './data/blogs';
import { users } from './data/users';
import { mainData } from './data/dashboard';

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
    const response = await waitFor(mainData, 2000);
    return res(ctx.json(response));
  }),
];

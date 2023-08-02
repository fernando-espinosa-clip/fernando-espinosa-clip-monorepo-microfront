import { rest } from "msw";
import { blogs} from "./data/blogs";
import { users } from "./data/users"


export const handlers = [
    rest.get("/api/blogs", (req, res, ctx) => {
        return res(ctx.json(blogs));
    }),
    rest.post("http://some.fake.api.com/login", async (req, res, ctx) => {
        const { email, password } = await req.json();
        const userFound = users.find((u) => u.email === email && u.password === password)
        if (userFound) {
            return res(ctx.json(userFound.uuid));
        }
        return res(
            // Send a valid HTTP status code
            ctx.status(403),
            // And a response body, if necessary
            ctx.json({
                errorMessage: `User '${email}' not found`,
            }),
        )
    })
]
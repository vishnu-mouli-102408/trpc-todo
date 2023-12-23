import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputTypes = z.object({
  title: z.string(),
  description: z.string(),
  done: z.string().optional(),
});

const appRouter = router({
  // ...
  createTodo: publicProcedure.input(todoInputTypes).mutation(async (opts) => {
    const username = opts.ctx.username;
    console.log({ username });

    const title = opts.input.title;
    const description = opts.input.description;

    // database call to post data

    return {
      id: "1",
    };
  }),

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const email = opts.input.email;
      const password = opts.input.password;

      // Do database call and henerate token from JWT

      const token = "123409876";
      return {
        token,
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    // verify here
    console.log({ authHeader });
    return {
      username: "Mouli",
    };
  },
});

server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

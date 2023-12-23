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
    const title = opts.input.title;
    const description = opts.input.description;

    // database call to post data

    return {
      id: "1",
    };
  }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

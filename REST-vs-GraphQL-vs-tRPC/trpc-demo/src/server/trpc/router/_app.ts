import { router } from "../trpc";
import { employeeRouter } from "./example";

export const appRouter = router({
  employee: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

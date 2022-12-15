import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const employeeRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.employee.findMany()),
  getByLastName: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      ctx.prisma.employee.findFirst({ where: { lastName: input } })
    ),
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        team: z.enum(["Lit", "Prettier"]),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.employee.create({ data: input });
    }),
});

import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const employeeRouter = router({
  getEveryone: publicProcedure.query(({ ctx }) =>
    ctx.prisma.employee.findMany()
  ),
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
        age: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.employee.create({ data: input });
    }),
});

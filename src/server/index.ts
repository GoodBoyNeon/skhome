import { getAllProducts } from "@/db";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getAllProducts: publicProcedure.query(async () => await getAllProducts()),
});

export type AppRouter = typeof appRouter;

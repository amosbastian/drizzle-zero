import { sql } from "drizzle-orm";
import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { id, timestamps } from "../sql.js";

export const user = pgTable(
  "user",
  {
    email: text("email").$type<`${string}@${string}`>().notNull(),
    id: id(),
    name: text("name"),
    ...timestamps,
  },
  (t) => [uniqueIndex("email_idx").on(sql`lower(${t.email})`)],
);

export type User = typeof user.$inferSelect;
export type InsertUser = Omit<typeof user.$inferInsert, "createdAt" | "updatedAt"> & { id: string };
export type UpdateUser = Partial<InsertUser> & { id: string };


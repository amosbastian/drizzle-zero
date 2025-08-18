import * as drizzleSchema from "@acme/db/schema";
import { drizzleZeroConfig } from "drizzle-zero";

export default drizzleZeroConfig(drizzleSchema, {
  tables: {
    user: {
      createdAt: true,
      email: true,
      id: true,
      name: true,
      updatedAt: true,
    },
  },
});

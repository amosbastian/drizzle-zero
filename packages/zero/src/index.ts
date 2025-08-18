import { ANYONE_CAN_DO_ANYTHING, definePermissions, type PermissionsConfig, type Row } from "@rocicorp/zero";
import { schema, type Schema } from "./schema.js";

const permissions = definePermissions<AuthenticationData, Schema>(schema, () => {
  return {
    user: ANYONE_CAN_DO_ANYTHING,
  } satisfies PermissionsConfig<AuthenticationData, Schema>;
});

export type User = Row<typeof schema.tables.user>;
export type AuthenticationData = { sub: User["id"] | null } & Partial<Pick<User, "email" | "name">>;

export { permissions, schema };
export type { Schema };

import { createMutators } from "./client.js";

export function createServerMutators() {
  const mutators = createMutators();
  return mutators;
}

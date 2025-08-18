import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export function useZero() {
  const router = useRouter();
  const { zero } = router.options.context;

  return zero;
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const z = useZero();
  const [users] = useQuery(z.query.user);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

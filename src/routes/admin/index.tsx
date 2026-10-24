import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAdminEmail } from "#/lib/auth/admin";
import { $getUser } from "#/lib/auth/functions";

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await $getUser();

    if (!user) {
      throw redirect({ to: "/admin/login" });
    }

    if (!isAdminEmail(user.email)) {
      throw redirect({ to: "/" });
    }

    return { user };
  },
})

function RouteComponent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Admin dashboard is not built yet.
      </p>
    </div>
  );
}

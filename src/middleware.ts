import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }: { token?: unknown }) => Boolean(token),
  },
});

export const config = { matcher: ["/userPanel"] };

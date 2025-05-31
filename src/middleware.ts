import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("middleware token:", token);
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/userPanel", "/userPanel/:path*"],
};

// This middleware can be used to protect any route and page
// It will return a 401 if the user is not logged in
// Without a matcher it will protect all routes and pages

export { default } from "next-auth/middleware";

// This matcher is an array that contains the routes that you want to protect
// This example protects all routes except /register, /api, and /login directories
export const config = {
  // matcher: ["/profile"],
  //   matcher: ["/((?!register|api|login).*)"],
  matcher: ["/((?!register|api|login).+)"],
};

const auth = (req, res, next) => {
  if (req?.session?.isLoggedIn) return next(); // User is authenticated, allow them to proceed
  res.redirect("/login"); // Redirect to login page if not authenticated
};

export default auth;

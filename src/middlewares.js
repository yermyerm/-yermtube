export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(res.session.loggedIn);
  res.locals.siteName = "yermtube";
  console.log(res.locals);
  next();
};

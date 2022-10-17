export default function auth({ next, router, store }) {
  if (!store.state.auth.loggedIn && store.state.auth.user.status != "active") {
    return next({
      path: '/login',
    })
  }

  if (store.state.auth.user.status == "rejected") {
    return next({
      path: '/form-register',
    })
  }


  return next();
}
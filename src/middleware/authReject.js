export default function authReject({ next, router, store }) {
  if (!store.state.auth.loggedIn) {
    return next({
      path: '/login',
    })
  }

  if (store.state.auth.user.status != "rejected") {
    // router.go(-1)
    return next({
      path: '/403',
    })
  }

  return next();
}
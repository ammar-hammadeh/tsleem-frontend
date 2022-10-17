export default function auth({ next, router, store }) {
  console.log("store.state.auth.loggedIn")
  console.log(store)
  if (store.state.auth.loggedIn) {
    if (store.state.auth.user.status == 'active') {
      return next({
        path: '/dashboard',
      })
    } else if (store.state.auth.user.status == 'rejected') {
      return next({
        path: '/form-register',
      })
    }
  }
  return next();
}
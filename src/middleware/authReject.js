export default function authReject({ next, router, store }) {
  if (!store.state.auth.loggedIn) {
    return next({
      path: '/login',
    })
  }
  // console.log(store.state.auth.user.status)
  if (store.state.auth.user.status != "rejected" && store.state.auth.user.status != 'pending') {
    // router.go(-1)
    // console.log('test auth rejected')
    return next({
      path: '/403',
    })
  }

  return next();
}
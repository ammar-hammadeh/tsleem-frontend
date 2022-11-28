export default function auth({ next, router, store }) {
  if (!store.state.auth.loggedIn) {
    return next({
      path: '/login',
    })
  } else {
    // console.log(store.state.auth.user.status)
    if (store.state.auth.user && (store.state.auth.user.status == "rejected" || store.state.auth.user.status == 'pending')) {
      return next({
        path: '/form-register',
      })
    }
    else if (store.state.auth.user && store.state.auth.user.status != "active") {
      return next({
        path: '/login',
      })
    }
    if (store.state.auth.permissions) {
      store.dispatch('auth/getPermission')
    }
    store.dispatch("notifications/getNotifocations")
    return next();
  }


}
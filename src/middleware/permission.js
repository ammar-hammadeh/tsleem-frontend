export default function permission({ to, next, router, store }) {

  if (store.state.auth.permissions.length == 0) {
    // console.log(to.meta.permissions)
    // console.log(store.state.auth.permissions)
    // console.log(store.state.auth.permissions.includes(to.meta.permissions))
    store.dispatch('auth/getPermission').then(
      (res) => {
        checkPer()
      }
    )
  } else {
    checkPer()
  }


  function checkPer() {
    // console.log(to.meta.permissions)
    if (to.meta.permissions) {
      if (["index-employee", "add-employee"].includes(to.meta.permissions) && store.state.auth.user.parent_id != null
        || ["add-employee", "index-employee"].includes(to.meta.permissions) && store.state.auth.type.code == 'admin') {
        return next({
          path: '/403',
        })
      }
      if (!store.state.auth.permissions.includes(to.meta.permissions)) {
        return next({
          path: '/403',
        })
      }
    }
  }
  return next();
}

export default function permission({ to, nextMiddleware, contextContext, router, store, from }) {
  if (store.state.auth.permissions.length == 0) {
    store.dispatch("auth/getPermission").then((res) => {
      checkPer();
    });
  } else {
    checkPer();
  }

  function checkPer() {
    // console.log(to.meta.permissions)
    if (to.meta.permissions) {
      if (
        (["index-employee", "add-employee"].includes(to.meta.permissions) &&
          store.state.auth.user.parent_id != null) ||
        (["add-employee", "index-employee"].includes(to.meta.permissions) &&
          store.state.auth.type.code == "admin")
      ) {
        return contextContext({
          path: "/403",
        });
      }
      if (!store.state.auth.permissions.includes(to.meta.permissions)) {
        return contextContext({
          path: "/403",
        });
      }
    }
  }

  return nextMiddleware();
}

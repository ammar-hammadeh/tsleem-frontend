export default function guest({ nextMiddleware, router, store, contextNext }) {
  if (store.state.auth.loggedIn) {
    if (store.state.auth.user.status == "active") {
      return contextNext({
        path: "/dashboard",
      });
    } else if (
      store.state.auth.user.status == "rejected" ||
      store.state.auth.user.status == "pending"
    ) {
      return contextNext({
        path: "/form-register",
      });
    }
  }
  return nextMiddleware();
}

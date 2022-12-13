import { saveRedirectionIntoStorage } from "@/util/helpers/LoginRedirectionHelpers/LoginRedirectionHelpers";

export default function auth({
  nextMiddleware,
  router,
  store,
  to,
  from,
  contextNext,
}) {
  if (!store.state.auth.loggedIn) {
    saveRedirectionIntoStorage(to.fullPath);
    return contextNext({
      path: "/login",
    });
  } else {
    // console.log(store.state.auth.user.status)
    if (
      store.state.auth.user &&
      (store.state.auth.user.status == "rejected" ||
        store.state.auth.user.status == "pending")
    ) {
      return contextNext({
        path: "/form-register",
      });
    } else if (
      store.state.auth.user &&
      store.state.auth.user.status != "active"
    ) {
      return contextNext({
        path: "/login",
      });
    }
    store.dispatch("notifications/getNotifocations");
    return nextMiddleware();
  }
}

import { saveRedirectionIntoStorage } from "@/util/helpers/LoginRedirectionHelpers/LoginRedirectionHelpers";

export default function authReject({ nextMiddleware, contextNext, store, to }) {
  if (!store.state.auth.loggedIn) {
    saveRedirectionIntoStorage(to.fullPath);
    return contextNext({
      path: "/login",
    });
  }
  if (
    store.state.auth.user.status != "rejected" &&
    store.state.auth.user.status != "pending"
  ) {
    return contextNext({
      path: "/403",
    });
  }

  return nextMiddleware();
}

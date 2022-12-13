const KEY_IN_LOCALSTORAGE = "LOGIN_REDIRECTION_PATH";

function saveRedirectionIntoStorage(path) {
  localStorage.setItem(KEY_IN_LOCALSTORAGE, path);
}

function getRedirectionFromStorageAndRemove() {
  const path = localStorage.getItem(KEY_IN_LOCALSTORAGE);
  localStorage.removeItem(KEY_IN_LOCALSTORAGE);
  return path;
}

export { saveRedirectionIntoStorage, getRedirectionFromStorageAndRemove };

const KEY_IN_LOCALSTORAGE = "LOGIN_REDIRECTION_PATH";

function saveRedirectionIntoStorage(path) {

  // not saving login neither saving if there is some data already
  // because of recurrent redirection to login
  if(path !== "/login" && !hasPathInStorage()){

  localStorage.setItem(KEY_IN_LOCALSTORAGE, path);
  }
}

function hasPathInStorage(){
  return !!localStorage.getItem(KEY_IN_LOCALSTORAGE, null);
}

function getRedirectionFromStorageAndRemove() {
  const path = localStorage.getItem(KEY_IN_LOCALSTORAGE);
  localStorage.removeItem(KEY_IN_LOCALSTORAGE);
  return path;
}

export { saveRedirectionIntoStorage, getRedirectionFromStorageAndRemove };

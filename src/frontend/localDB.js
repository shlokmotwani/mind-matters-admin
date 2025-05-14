const LOCAL_STORAGE_TOKEN_VARIABLE_NAME = import.meta.env
  .VITE_LOCAL_STORAGE_TOKEN_VARIABLE;

export function assignLocalToken(value) {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_VARIABLE_NAME, value);
}

export function fetchLocalToken() {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_VARIABLE_NAME);
}

export function removeLocalToken() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_VARIABLE_NAME);
}

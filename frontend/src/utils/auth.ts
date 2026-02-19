const AUTH_STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY;

export const isUserAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
};

export const setUserAuthenticated = (isAuthenticated: boolean): void => {
  if (isAuthenticated) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
};

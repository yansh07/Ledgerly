const AUTH_STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY;

export function isUserAuthenticated(): boolean {
  const token = localStorage.getItem("access_token");
  // Check if the token exists and is not an empty string
  return !!token;
}

export const setUserAuthenticated = (isAuthenticated: boolean): void => {
  if (isAuthenticated) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export function logoutUser(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  // Redirect to home to ensure a clean state
  window.location.href = "/";
}

// Función para decodificar el token JWT
export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
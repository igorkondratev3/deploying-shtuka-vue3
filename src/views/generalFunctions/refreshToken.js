import { authContext } from '@/stores/authContext.js';

export const deleteRefreshTokenFromDB = async (refreshToken) => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URI}/refreshToken/`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });
  } catch(error) {
  }
};

export const getNewTokens = async (refreshToken) => {

  let response;
  let tokens;

  try {
    response = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/refreshToken/`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    tokens = await response.json();
    } catch(error) {
      return {error: 'Ошибка доступа к серверу'}
    }
  return tokens;
};

export const updateTokens = (tokens) => {
  const storeAuthContext = authContext();
  storeAuthContext.updateTokens(tokens.token, tokens.refreshToken);
  localStorage.setItem('user', JSON.stringify(storeAuthContext.user));
};

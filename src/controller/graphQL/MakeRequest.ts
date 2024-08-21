
import { IUser } from '../../AuthUser/models/IUser';
import { URL_GRAPHQL, URL_AUTH } from '../../const';
import authStore from '../../mobx/AuthStore';

class MakeRequest {
  isLoading = false;
  data: { method: string; headers: { "Content-Type": string; Authorization?: string }; body?: string };
  url: string;

  constructor() {
    this.url = URL_GRAPHQL;
    this.data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  setAuthToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.data.headers.Authorization = `Bearer ${token}`;
    }
  }

  async refreshToken() {
    const refreshResponse = await fetch(`${URL_AUTH}/refresh`, { credentials: 'include' });
    if (refreshResponse.ok) {
      const { accessToken } = await refreshResponse.json();
      localStorage.setItem('token', accessToken);
      this.setAuthToken(); // Оновлюємо токен в заголовку
      return true;
    } else {
      localStorage.removeItem("token");
      authStore.setAuth(false);
      authStore.setUser({} as IUser);
      return false;
    }
  }

  request = async (query: string) => {
    this.data.body = JSON.stringify({ query });

    try {
      this.isLoading = true;
      this.setAuthToken(); // Додаємо токен перед запитом

      let response = await fetch(this.url, { ...this.data, credentials: 'include' });

      // Якщо отримали 401, пробуємо оновити токен
      if (response.status === 401) {
        const isTokenRefreshed = await this.refreshToken();
        if (isTokenRefreshed) {
          // Повторний запит з оновленим токеном
          response = await fetch(this.url, { ...this.data, credentials: 'include' });
          
          if (response.status === 401) {
            localStorage.removeItem("token");
            authStore.setAuth(false);
            authStore.setUser({} as IUser);
            throw new Error("Unauthorized: Unable to refresh token");
          }
        } else {
          throw new Error("Unauthorized: Refresh token failed");
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error("Fetch error:", error);
      throw error;

    } finally {
      this.isLoading = false;
    }
  };

  isLoadingStatus() {
    return this.isLoading;
  }
}

export default MakeRequest;

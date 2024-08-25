
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

  
  request = async (query: string) => {
    this.data.body = JSON.stringify({ query });

    try {
      this.isLoading = true;
      let response = await fetch(this.url, { ...this.data });
      console.log(response)
      // Якщо отримали 401, пробуємо оновити токен
      if (response.status === 401) {
        const refreshResponse = await fetch(`${URL_AUTH}/refresh`, { credentials: 'include' });
        if (refreshResponse.ok) {
          const { accessToken } = await refreshResponse.json();
          localStorage.setItem('token', accessToken);

          // Оновлюємо заголовок з новим токеном
          this.data.headers.Authorization = `Bearer ${accessToken}`;

          // Повторний запит з оновленим токеном
          response = await fetch(this.url, { ...this.data });
           console.log(response)
          if (response.status === 401) {
            localStorage.removeItem("token");
            authStore.setAuth(false)
            authStore.setUser({} as IUser);
          }
          // return response
        } else {
          throw new Error("Unauthorized: Unable to refresh token");
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

  // request = async (query: string) => {
  //   this.data.body = JSON.stringify({ query });
    
  //   // Додаємо Bearer токен перед запитом
  //   this.setAuthToken();

  //   try {
  //     this.isLoading = true;
  //     const response = await fetch(this.url, { ...this.data });

  //     if (response.status === 401) {
  //       console.log('401')
  //       throw new Error("Unauthorized: Please check your credentials");
  //     }
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     throw error;
  //   } finally {
  //     this.isLoading = false;
  //   }
  // };

  isLoadingStatus() {
    return this.isLoading;
  }
}

export default MakeRequest;

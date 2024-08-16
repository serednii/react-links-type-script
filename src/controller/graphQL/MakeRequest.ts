import { URL } from '../../const';

class MakeRequest {
  isLoading = false;
  data: { method: string; headers: { "Content-Type": string; Authorization?: string }; body?: string };
  url: string;

  constructor() {
    this.url = URL;
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
    
    // Додаємо Bearer токен перед запитом
    this.setAuthToken();

    try {
      this.isLoading = true;
      const response = await fetch(this.url, { ...this.data });
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

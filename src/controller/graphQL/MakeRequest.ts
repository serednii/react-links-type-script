import { URL } from '../../const';


class MakeRequest {
    isLoading = false;
    data: { method: string; headers: { "Content-Type": string }; body?: string };
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
  
    request = async (query: string) => {
      this.data.body = JSON.stringify({ query });
  
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
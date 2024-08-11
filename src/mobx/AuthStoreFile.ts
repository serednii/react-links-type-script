import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import axios from 'axios';
import UserService from "../AuthUser/services/UserService";
import { IUser } from "../AuthUser/models/IUser";
import { AuthResponse } from "../AuthUser/models/response/authResponse";
import { API_URL } from "../AuthUser/http";
import AuthService from "../AuthUser/services/AuthServices"; // Додайте цей імпорт
import todoStore from "./store";
import  store  from '../redux/store'; // Імпортуйте ваш store
import { setError } from '../redux/uiSlice'; // Імпортуйте екшн для помилок

class AuthStore {
  user: IUser = {} as IUser;
  isAuth: boolean = false;
  isLoading: boolean = false;
  users: IUser[] = []; // Виправлено ініціалізацію масиву

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  setUsers(users: IUser[]){
    this.users = users
  }
  
  async getUsers() { // Виправлено метод
    try {
      const response = await UserService.fetchUsers();
      this.users = response?.data;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error.response?.data?.message);
      store.dispatch(setError(error.response?.data?.message || "Error getUsers"));
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response?.data?.accessToken);
      this.setAuth(true);
      this.setUser(response?.data?.user);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error?.response?.data?.message);
      store.dispatch(setError(error.response?.data?.message || "Error login"));
    }
  }

  async registration(email: string, password: string, userName: string, lastUserName: string) {
    try {
      const response = await AuthService.registration(email, password, userName, lastUserName);
      console.log('response auth store', response)
      localStorage.setItem("token", response?.data?.accessToken);
      const idUser = response?.data?.user?.id
      console.log(idUser)
      await todoStore.createMenu(idUser)
      this.setAuth(true);
      this.setUser(response?.data?.user);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error?.response?.data?.message);
      store.dispatch(setError(error.response?.data?.message || "Error registration"));
    }
  }

  async updateUser(user: IUser) {

    try {
      const response = await AuthService.updateUser(user);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error.response?.data?.message);
    }
  }


  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error?.response?.data?.message);
      store.dispatch(setError(error?.response?.data?.message || "Error logout"));
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      this.setAuth(true);
      this.setUser(response?.data?.user);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error?.response?.data?.message);
      store.dispatch(setError(error?.response?.data?.message || "Error checkAuth"));
    } finally {
      this.setLoading(false);
    }
  }
}

const authStore = new AuthStore();
export default authStore;

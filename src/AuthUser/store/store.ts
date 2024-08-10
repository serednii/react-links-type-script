import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthServices";
import axios from 'axios';
import { AuthResponse } from "../models/response/authResponse";
import { API_URL } from "../http";

export default class Store {

  
  user = {} as IUser;
  isAuth = false;
  isLoading = false

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool:boolean){
    this.isLoading = bool
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      console.log('email', email)
      console.log('password', password)


      const response = await AuthService.registration(email, password);
      console.log('registrace id user', response?.data?.user?.id)
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
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth(){
    this.setLoading(true)
    try{
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true}) 
        console.log(response)
        this.setAuth(true);
      this.setUser(response.data.user);
    }catch(e){
      const error = e as AxiosError<{ message: string }>;
      console.log(error.response?.data?.message);
    }finally{
        this.setLoading(false)
    }
  }

}

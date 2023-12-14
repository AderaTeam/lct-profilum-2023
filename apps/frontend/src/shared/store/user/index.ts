import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from 'shared/api';
import { IUser } from 'shared/models/IUser';
import { AuthResponse } from 'shared/models/response/AuthResponse';
import AuthServices from 'shared/services/AuthServices';
import { data } from './mockdata';

export default class UserStore {
  user = {} as IUser;
  isAuth = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.user = data;
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

  async login(nickname: string, password: string, role: string) {
    try {
      const response = await AuthServices.login(nickname, password, role);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(
    username: string,
    nickname: string,
    password: string,
    grade: string
  ) {
    try {
      const response = await AuthServices.registration(
        username,
        nickname,
        password,
        grade
      );
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}

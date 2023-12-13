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

  async login(email: string, password: string, role: string) {
    try {
      const response = await AuthServices.login(email, password, role);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('rtoken', response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(username: string, email: string, password: string) {
    try {
      const response = await AuthServices.registration(
        username,
        email,
        password
      );
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('rtoken', response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthServices.logout();
      console.table(response);
      localStorage.removeItem('token');
      localStorage.removeItem('rtoken');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/users/refresh`,
        { refreshToken: `${localStorage.getItem('rtoken')}` }
      );
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('rtoken', response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}

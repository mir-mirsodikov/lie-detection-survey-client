import axios from 'axios';
import { baseUrl } from '../helpers/constants';
import { IUser } from '../model/user';

export class AuthService {
  static url = baseUrl + '/admin/login'
  static async signIn(username: string, password: string) {
    let response = await axios.post(this.url, {
      username,
      password
    });
    return response.data;
  }
}
import axios from 'axios';
import { baseUrl } from '../helpers/constants';
import { IUser } from '../model/user';

export class AuthService {
  static url = baseUrl + '/admin/signin'
  static async signIn(user: IUser) {
    let response = await axios.post(this.url, {
      username: user.username,
      password: user.password
    });
    return response.data();
  }
}
import axios from 'axios';
import { baseUrl } from '../helpers/constants';

export class AuthService {
  static url = baseUrl + '/admin';
  static async signIn(username: string, password: string) {
    let response = await axios.post(this.url + '/login', {
      username,
      password,
    });
    return response.data.token;
  }

  static async authorize(token: string) {
    const response = await axios.get(this.url + '/authorize', {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  }
}

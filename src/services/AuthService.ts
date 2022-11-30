import axios from 'axios';
import { baseUrl } from '../helpers/constants';

export class AuthService {
  static url = baseUrl + '/admin';
  static async signIn(username: string, password: string) {
    let response = await axios.post(this.url + '/login', {
      username,
      password,
    });
    return {
      token: response.data.token,
      id: response.data.id,
      name: response.data.name,
    };
  }

  static async signUp(name: string, username: string, password: string) {
    let response = await axios.post(this.url + '/signup', {
      name,
      username,
      password,
    });

    return {
      token: response.data.token,
      id: response.data.id,
      name: response.data.name,
    };
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

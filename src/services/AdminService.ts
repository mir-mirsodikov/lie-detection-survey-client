import axios from 'axios';
import { baseUrl } from '../helpers/constants';
import { useAuthStore } from '../store/auth';
import { AuthService } from './AuthService';

export class AdminService {
  static url = baseUrl + '/admin';

  static async createQuestion(question: string) {
    const token = useAuthStore().token;
    const response = await axios.post(this.url + '/survey', {
      value: question
    },{
      headers: {
        authorization: token,
      }
    });

    return response.data;
  }

  static async getQuestions() {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + '/survey', {
      headers: {
        authorization: token,
      }
    });

    return response.data;
  }
}
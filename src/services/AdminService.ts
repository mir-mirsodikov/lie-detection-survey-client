import axios from 'axios';
import internal from 'stream';
import { baseUrl } from '../helpers/constants';
import { useAuthStore } from '../store/auth';
import { AuthService } from './AuthService';

export class AdminService {
  static url = baseUrl + '/admin';

  static async createQuestion(question: string) {
    const token = useAuthStore().token;
    const response = await axios.post(
      this.url + '/survey',
      {
        value: question,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );

    return response.data;
  }

  static async getQuestions() {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + '/survey', {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }

  static async updateQuestion(id: number, value: string) {
    const token = useAuthStore().token;
    const response = await axios.patch(
      this.url + '/survey/' + id,
      {
        value,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );

    console.log(`response data: ${JSON.stringify(response.data)}`);
    return response.data;
  }

  static async deleteQuestion(id: number, active: boolean) {
    const token = useAuthStore().token;
    const response = await axios.delete(
      this.url + '/survey/' + id,
      {
        headers: {
          authorization: token,
        },
      },
    );

    return response.data;
  }

  static async setSettings(settings: { wpm: number; instructions: string }) {
    const token = useAuthStore().token;
    const response = await axios.post(
      this.url + '/settings',
      {
        wpm: settings.wpm,
        instructions: settings.instructions,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );

    return {
      wpm: response.data.wpm,
      instructions: response.data.instructions,
    };
  }

  static async downloadQuestions() {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + '/download/questions', {
      headers: {
        authorization: token,
      },
    });

    console.log(response.data);
    return response.data;
  }

  static async downloadResponses() {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + '/download/responses', {
      headers: {
        authorization: token,
      },
    });

    console.log(response.data);
    return response.data;
  }
}

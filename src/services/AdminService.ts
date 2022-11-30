import axios from 'axios';
import internal from 'stream';
import { baseUrl } from '../helpers/constants';
import { useAuthStore } from '../store/auth';
import { AuthService } from './AuthService';

export class AdminService {
  static url = baseUrl + '/admin';

  static async createQuestion(question: string, userId: number) {
    const token = useAuthStore().token;
    const response = await axios.post(
      this.url + '/survey',
      {
        value: question,
        userId
      },
      {
        headers: {
          authorization: token,
        },
      },
    );

    return response.data;
  }

  static async getQuestions(userId: string) {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + `/survey/${userId}`, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }

  static async updateQuestion(id: number, value: string, isActive: boolean) {
    const token = useAuthStore().token;
    const response = await axios.patch(
      this.url + '/survey/' + id,
      {
        value,
        isActive,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );
    return response.data;
  }

  static async deleteQuestion(id: number, active: boolean) {
    const token = useAuthStore().token;
    const response = await axios.delete(this.url + '/survey/' + id, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }

  static async setSettings(settings: {
    wordDuration: number;
    instructions: string;
    endMessage: string;
  }, userId: number) {
    const token = useAuthStore().token;
    const response = await axios.post(
      this.url + '/settings',
      {
        wordDuration: settings.wordDuration,
        instructions: settings.instructions,
        endMessage: settings.endMessage,
        userId,
      },
      {
        headers: {
          authorization: token,
        },
      },
    );

    return {
      wordDuration: response.data.wpm,
      instructions: response.data.instructions,
      endMessage: response.data.endMessage,
    };
  }

  static async downloadQuestions() {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + '/download/questions', {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }

  static async downloadResponses() {
    const token = useAuthStore().token;
    const response = await axios.get(this.url + '/download/responses', {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  }
}

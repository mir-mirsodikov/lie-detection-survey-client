import axios from 'axios';
import { baseUrl } from '../helpers/constants';

export class SurveyService {
  static url = baseUrl + '/survey';

  static async getSettings() {
    const response = await axios.get(this.url + '/settings');
    return {
      wpm: response.data.wpm,
      instructions: response.data.instructions,
    };
  }

  static async createParticipant(name: string, email: string, gender: string) {
    const response = await axios.post(this.url + '/participant', {
      name,
      email,
      gender,
    });

    return response.data;
  }
}

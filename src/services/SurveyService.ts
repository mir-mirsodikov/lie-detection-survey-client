import axios from 'axios';
import { baseUrl } from '../helpers/constants';

export class SurveyService {
  static url = baseUrl + '/survey';

  static async getSettings() {
    const response = await axios.get(this.url + '/settings');
    return {
      wpm: response.data.wpm,
      instructions: response.data.instructions,
    }
  }
}
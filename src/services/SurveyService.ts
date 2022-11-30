import axios from 'axios';
import { baseUrl } from '../helpers/constants';

export class SurveyService {
  static url = baseUrl + '/survey';

  static async getSettings(userId: number) {
    const response = await axios.get(this.url + `/settings/${userId}`);

    return {
      wordDuration: response.data.wordDuration,
      instructions: response.data.instructions,
      endMessage: response.data.endMessage,
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

  static async getSurveyQuestions(userId: number) {
    const response = await axios.get(this.url + `/${userId}`);
    return response.data;
  }

  static async submitSurvey(
    participantId: number,
    surveyId: number,
    rating: number
  ) {
    await axios.post(this.url, {
      participantId,
      surveyId,
      rating,
    });
  }
}

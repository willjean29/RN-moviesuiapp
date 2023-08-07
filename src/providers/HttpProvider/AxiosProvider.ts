import { apiBaseUrl } from '@api/moviedb';
import { apiKey } from '@constants/index';
import { StringKeyValueObject } from '@interfaces/app';
import axios, { AxiosInstance } from 'axios';
import { HttpInterface } from './HttpInterface';

class AxiosProvider implements HttpInterface {
  private httpApi: AxiosInstance;
  constructor() {
    this.httpApi = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
    });
  }
  async get<T>(url: string, params?: StringKeyValueObject): Promise<T> {
    const response = await this.httpApi.get<T>(url, { params });
    const data = response.data;
    return data;
  }
}

export default AxiosProvider;

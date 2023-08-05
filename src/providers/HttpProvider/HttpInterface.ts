import { StringKeyValueObject } from '@interfaces/app';

export interface HttpInterface {
  get<T>(url: string, params?: StringKeyValueObject): Promise<T>;
}

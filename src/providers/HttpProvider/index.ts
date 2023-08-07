import { httpDriverDefault } from '@constants/index';
import { StringKeyValueObject } from '@interfaces/app';
import AxiosProvider from './AxiosProvider';
import { HttpDrivers } from './HttpDrivers';
import { HttpInterface } from './HttpInterface';

class HttpProvider implements HttpInterface {
  private httpProvider: HttpInterface;
  private httpDriver: HttpDrivers;

  constructor() {
    this.httpProvider = this.selectHttpProvider();
    this.httpDriver = this.defaultHttDriver();
  }

  async get<T>(url: string, params?: StringKeyValueObject): Promise<T> {
    return await this.httpProvider.get<T>(url, params);
  }

  defaultHttDriver() {
    const driver = httpDriverDefault;
    return driver;
  }

  selectHttpProvider() {
    switch (this.httpDriver) {
      default:
        return new AxiosProvider();
    }
  }
}

export default HttpProvider;

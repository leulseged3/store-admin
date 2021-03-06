import { API_STORE } from './constants';
import { getResponseData } from './get-data';

export const login = (email: string, password: string) => {
  return API_STORE.post<ILoginResponse>('auth', { email: email, password: password }, {
    headers: {
      usertype: 'ADMIN'
    }
  })
    .then(res => getResponseData(res))
}

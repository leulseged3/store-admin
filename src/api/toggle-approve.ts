import { API_STORE } from './constants';
import { getResponseData } from './get-data';

export const toggleApprove = (id: string, token: string) => {
  API_STORE.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

  return API_STORE.put<IRecord>(`sales/${id}`,{}, {
    headers: {
      usertype: 'ADMIN',
    }
  })
    .then(res => getResponseData(res))
}
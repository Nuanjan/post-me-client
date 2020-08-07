import apiUrl from '../apiConfig'
import axios from 'axios'

export const postIndex = (user) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

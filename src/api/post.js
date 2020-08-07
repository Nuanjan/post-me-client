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

export const postDelete = (postId, userToken) => {
  console.log(postId, 'from api call')
  return axios({
    url: apiUrl + '/posts/' + postId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${userToken}`
    }
  })
}

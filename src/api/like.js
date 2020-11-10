import apiUrl from '../apiConfig'
import axios from 'axios'

export const likeCreate = (userId, postId, like) => {
  return axios({
    url: apiUrl + '/likes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      like: {
        likeStatus: like,
        postId: postId,
        liketer: userId
      }
    }
  })
}

export const likeUpdate = (like, likeId) => {
  return axios({
    url: apiUrl + '/likes/' + likeId,
    method: 'PATCH',
    data: {
      like: {
        likeStatus: like
      }
    }
  })
}

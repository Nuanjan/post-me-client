import apiUrl from '../apiConfig'
import axios from 'axios'

export const likeCreate = (userId, postId) => {
  console.log(userId)
  return axios({
    url: apiUrl + '/likes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      like: {
        likeStatus: true,
        postId: postId,
        liketer: userId
      }
    }
  })
}

export const likeUpdate = (like, likeId) => {
  console.log(like)
  console.log(likeId)
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

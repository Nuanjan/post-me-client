import apiUrl from '../apiConfig'
import axios from 'axios'

export const postCreate = (userToken, post) => {
  console.log(post)
  console.log(userToken)
  return axios({
    url: apiUrl + '/posting',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${userToken}`
    },
    data: {
      post: post
    }
  })
}

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

// parameter name does not matter but order are matter!
export const postUpdate = (userToken, post, postId) => {
  console.log('pass this request')
  return axios({
    url: apiUrl + '/posts/' + postId,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${userToken}`
    },
    data: {
      post: post
    }
  })
}

export const postShow = (postId, userToken) => {
  return axios({
    url: apiUrl + '/posts/' + postId,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${userToken}`
    }
  })
}

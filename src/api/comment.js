import apiUrl from '../apiConfig'
import axios from 'axios'

export const commentCreate = (userId, postId, comment) => {
  const commentText = comment.text
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      comment: {
        text: commentText,
        postId: postId,
        commenter: userId
      }
    }
  })
}

export const commentDelete = (commentId) => {
  return axios({
    url: apiUrl + '/comments/' + commentId,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

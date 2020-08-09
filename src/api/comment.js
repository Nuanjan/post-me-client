import apiUrl from '../apiConfig'
import axios from 'axios'

export const commentCreate = (userId, postId, comment) => {
  console.log(postId)
  console.log(userId)
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

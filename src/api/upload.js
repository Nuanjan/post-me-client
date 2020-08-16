import apiUrl from '../apiConfig'
import axios from 'axios'

// S3 upload
export const uploadCreate = (contentType, userToken, formData) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${userToken}`,
      'Content-Type': contentType
    },
    data: formData
  })
}

export const showImage = (imageId, userToken) => {
  console.log(imageId, 'image id')
  console.log(userToken, ' this is userToken')
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads/' + imageId,
    headers: {
      'Authorization': `Token token=${userToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const indexImage = (user) => {
  console.log(user.token, ' this is userToken')
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${user.token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

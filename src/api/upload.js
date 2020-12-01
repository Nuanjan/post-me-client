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
  return axios({
    method: 'GET',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${user.token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

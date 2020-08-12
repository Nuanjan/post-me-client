import apiUrl from '../apiConfig'
import axios from 'axios'

// S3 upload
export const uploadCreate = (contentType, userToken, formData) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/uploads',
    headers: {
      'Authorization': `Token token=${userToken}`,
      'Content-Type': false
    },
    data: formData
  })
}

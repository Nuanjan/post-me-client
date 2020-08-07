import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from './../../apiConfig'

const ProfileImg = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('choose file')
  const [uploadFile, setUploadFile] = useState({})
  const onChange = e => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }
  const onSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post(apiUrl + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const { fileName, filePath } = res.data
      setUploadFile({ fileName, filePath })
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was aproblem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div className="custom-file">
          <input type='file' className="custom-file-input" id="customFile" onChange={onChange}/>
          <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
        </div>
        <input
          type='submit'
          value='upload'
          className='btn btn-primary btn-block mt-4' />
      </Form>
      { uploadFile ? <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <h3 className="text-conter">{ uploadFile.fileName }</h3>
          <img style= {{ width: '100%' }} src={uploadFile.filePath} alt=""/>
        </div>
      </div> : null }
    </div>
  )
}

export default ProfileImg

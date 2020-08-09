import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'

const ProfileImg = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('choose file')
  const [uploadFile, setUploadFile] = useState({
    fileName: '',
    filePath: '/uploads/user_yellow.png'
  })
  // const [image, setImage] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
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
      setShow(false)
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
      <Container>
        <Row>
          <Col className="col-img">
            { uploadFile ? <div className="row mt-5">
              <div className="col-md-6 m-auto">
                <Image className='profile-img' src={`${process.env.PUBLIC_URL}${uploadFile.filePath}`} roundedCircle />
              </div>
            </div> : null }
            <div className="icon-upload">
              <FontAwesomeIcon
                icon={ faFileImage}
                size={60}
                onClick={handleShow}/>
            </div>
          </Col>
        </Row>gi
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
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
      </Modal>
    </div>
  )
}

export default ProfileImg

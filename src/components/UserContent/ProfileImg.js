import React, { useState } from 'react'
import './../../index.scss'
import { uploadCreate } from '../../api/upload'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const ProfileImg = ({ userToken, setImg }) => {
  const [image, setImage] = useState('')
  const [fileName, setFileName] = useState('choose file')
  const [upload, setUpload] = useState(false)
  // const [uploadFile, setUploadFile] = useState({
  //   fileName: '',
  //   filePath: '/uploads/user_yellow.png'
  // })
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange = event => {
    setImage(event.target.files[0])
    setFileName(event.target.files[0].name)
    setUpload(true)
    console.log(event.target.files[0], ' this files')
  }
  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', fileName)
    formData.append('image', image.webkitRelativePath)
    console.log(formData, ' this is form data')
    event.preventDefault()
    uploadCreate(userToken, formData)
      .then(res => {
        // this is make empty object have some Object
        // it will make useeffect at parent triiger
      //  setUploadFile(res)
      })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col className="col-img">
            { upload ? <div className="row mt-5">
              <div className="col-md-6 m-auto">
                <Image className='profile-img' src={setImg} roundedCircle />
              </div>
            </div> : null }
            <div className="icon-upload">
              <FontAwesomeIcon
                icon={ faFileImage}
                size="2x"
                onClick={handleShow}/>
            </div>
          </Col>
        </Row>gi
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={handleSubmit}>
          <div className="custom-file">
            <input
              type='file'
              name='image'
              className="custom-file-input"
              id="customFile" onChange={handleChange}/>
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

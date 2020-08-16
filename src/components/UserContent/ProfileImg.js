import React, { useState } from 'react'
import './../../index.scss'
import { uploadCreate } from '../../api/upload'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// import Image from 'react-bootstrap/Image'
// import ShowImage from './ShowImage'

const ProfileImg = ({ user, setUpload }) => {
  console.log(user, ' this is user Token')
  const [image, setImage] = useState(null)
  const [name, setName] = useState('choose file')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // const [imageUrl, setImageUrl] = useState('')

  // const handelSubmitShow = (imageId) => {
  //   showImage(imageId, user.token)
  //     .then(res => {
  //       console.log(res.data.upload.imageUrl)
  //       // setImageUrl(res.data.upload.imageUrl)
  //       setImageUrl(res.data.upload.imageUrl)
  //     })
  // }
  const handleChange = event => {
    setImage(event.target.files[0])
    setName(event.target.files[0].name)
  }
  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    console.log('pass this line 43')
    uploadCreate('multipart/form-data', user.token, formData)
      .then(res => {
        console.log(res.data.upload._id)
        // setImageId(res.data.upload._id)
        setImage(res.data.upload)
        setShow(false)
        setUpload(res.data.upload)
        return res
      })
      // .then(res => handelSubmitShow(res.data.upload._id))
      .catch(console.error)
  }

  return (
    <div>
      <Container>
        <Row>
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
            </div>
          </div>
          <Col className="col-img">
            <div className="icon-upload">
              <FontAwesomeIcon
                icon={ faFileImage}
                size="2x"
                onClick={handleShow}/>
            </div>
          </Col>
        </Row>
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
            <label className="custom-file-label" htmlFor="customFile">{name}</label>
          </div>
          <input
            type='button'
            value='Upload'
            className='btn btn-primary btn-block mt-4'
            onClick={handleSubmit} />
        </Form>
      </Modal>
    </div>
  )
}
export default ProfileImg

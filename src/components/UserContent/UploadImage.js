import React, { useState } from 'react'
import { uploadCreate } from './../../api/upload.js'
// import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import messages from '../AutoDismissAlert/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'

const UploadImage = ({ user, setImg }) => {
  // const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    uploadCreate('multipart/form-data', formData, user)
      .then(res => {
        console.log(res.data.upload)
        setImg(res.data.upload)
      })
      .catch(console.error)
  }
  return (
    <div>
      <Form>
        <div className="icon-upload">
          <FontAwesomeIcon
            icon={ faFileImage}
            size="2x"
            onClick={handleShow}/>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Your Profile Image Here</Modal.Title>
          </Modal.Header>
          <Form>
            <div className="custom-file">
              <input
                type='file'
                name='image'
                className="custom-file-input"
                id="customFile" onChange={(event) => setImage(event.target.files[0])}/>
            </div>
            <input
              onClick={uploadWithFormData}
              type='submit'
              value='uploads'
              className='btn btn-primary btn-block mt-4' />
          </Form>
        </Modal>
      </Form>
    </div>
  )
}
export default UploadImage

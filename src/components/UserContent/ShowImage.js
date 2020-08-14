import React, { useState } from 'react'
import './../../index.scss'
import { showImage } from '../../api/upload'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const ShowImage = ({ userToken, imageId }) => {
  console.log(imageId)
  const [image, setImage] = useState({})

  const handleSubmitShow = event => {
    showImage(imageId, userToken)
      .then(res => {
        console.log(res.data.upload)
        setImage(res.data.upload)
      })
  }

  return (
    <div>
      <Container>
        <Row>
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <Image className='profile-img' src={image.imageUrl} roundedCircle />
              <Button onClick={handleSubmitShow}>Show Image</Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default ShowImage

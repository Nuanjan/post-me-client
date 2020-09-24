import React, { useState, useEffect } from 'react'
import './../../index.scss'
import { indexImage } from '../../api/upload'
import Image from 'react-bootstrap/Image'
import ProfileImage from './ProfileImg'

const style = {
  flex: '1',
  flexDirection: 'row'
}
// <Image className='profile-img' src={upload.imageUrl} roundedCircle crossorigin="anonymous" />
const imgU = []
const ShowImage = ({ user }) => {
//  const [imageUrl, setImageUrl] = useState('')
  const [uploads, setUploads] = useState([])
  // const [close, setClose] = useState(false)
  const [upload, setUpload] = useState({})
  useEffect(() => {
    indexImage(user)
      .then(res => {
        setUploads(res.data.uploads.filter(upload => upload.owner === user._id))
        //  setClose(true)
        console.log(res.data.uploads)
        imgU.push(res.data.uploads)
        console.log(imgU)
      })
  }, [upload])

  return (
    <div>
      <div className= "image-wrap">
        {
          uploads.map((upload, i) => (
            <div key={i} className="mt-5" style={style}>
              <div className="col-md-12 col-lg-6 m-auto image-upload">
                {
                  (i === uploads.length - 1 && upload.owner === user._id)
                    ? <Image className='profile-img' src={upload.imageUrl} roundedCircle crossorigin="anonymous" />
                    : null
                }
              </div>
            </div>
          ))
        }
      </div>
      <ProfileImage
        user={user}
        setUpload={setUpload}/>
    </div>
  )
}
export default ShowImage

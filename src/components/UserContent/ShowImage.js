import React, { useState, useEffect } from 'react'
import './../../index.scss'
import { indexImage } from '../../api/upload'
import Image from 'react-bootstrap/Image'
import ProfileImage from './ProfileImg'

const style = {
  flex: '1',
  flexDirection: 'row'
}

const ShowImage = ({ user }) => {
//  const [imageUrl, setImageUrl] = useState('')
  const [uploads, setUploads] = useState([])
  const [close, setClose] = useState(false)
  const [upload, setUpload] = useState({})
  useEffect(() => {
    indexImage(user)
      .then(res => {
        setUploads(res.data.uploads)
        setClose(true)
      })
  }, [upload])
  return (
    <div>
      {
        uploads.map((upload, i) => (
          <div key={i} className="mt-5" style={style}>
            <div className="col-md-6 m-auto">
              {
                (i === uploads.length - 1 && upload.owner === user._id)
                  ? <Image className='profile-img' src={upload.imageUrl} roundedCircle />
                  : <p>{close}</p>
              }
            </div>
          </div>
        ))
      }
      <ProfileImage
        user={user}
        setUpload={setUpload}/>
    </div>
  )
}
export default ShowImage

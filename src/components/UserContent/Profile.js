import React, { Component } from 'react'
import defaultPic from './user_yellow.png'
import ProfileImg from './ProfileImg'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = { profileImg: '' }
  }
handleImgChange = (profileImg) => {
  this.setState({
    profileImg
  })
}
render () {
  return ()
}
}
export default Profile

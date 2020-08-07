import React, { useState, useEffect } from 'react'
import './../../index.scss'
import { postIndex } from '../../api/post'

import PostChild from './PostChild'

// import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'

import Container from 'react-bootstrap/Container'

const PostIndex = ({ user }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    postIndex(user)
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch()
  }, [])

  return (
    <Container fluid>
      {
        posts.map((post, i) => (
          <PostChild
            key={i}
            text={post.text}
            postId={post._id}
            userToken={user.token}
            userId={user._id}
            owner={post.owner} />
        ))
      }
    </Container>
  )
}
export default PostIndex

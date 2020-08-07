import React, { useState, useEffect } from 'react'
import './../../index.scss'
import { postIndex } from '../../api/post'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import PostChild from './PostChild'
import PostCreate from './PostCreate'
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
      <Row>
        <div className="post-main">
          <div className="post-profile">
            <div className="post-profie-child">
              <PostCreate userToken={user.token}/>
            </div>
          </div>
          <div className="post-post">
            <Col>
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
            </Col>
          </div>
        </div>
      </Row>
    </Container>
  )
}
export default PostIndex

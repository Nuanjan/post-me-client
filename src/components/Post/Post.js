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
  console.log(user.token, 'user from post')
  const [posts, setPosts] = useState([])
  // it like a switch to trigger by passing it to the child
  // useEffect will run anytime the parameter in [] Change
  // in this case I pass newPost which emty object and passing
  // newPost to child and add an object to it to trigger the
  // useEffect at parent level.
  const [newPost, setNewPost] = useState({})
  // useEffect run before render
  // render and then retun JSX
  useEffect(() => {
    postIndex(user)
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch()
  }, [newPost])

  return (
    <Container fluid>
      <Row>
        <div className="post-main">
          <div className="post-profile">
            <div className="post-profie-child">
              <PostCreate
                user={user}
                setNewPost={setNewPost}
                posts={posts}/>
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

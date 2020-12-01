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

const PostIndex = ({ user, msgAlert, setImg }) => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ text: '' })

  // it like a switch to trigger by passing it to the child
  // useEffect will run anytime the parameter in [] Change
  // in this case I pass newPost which emty object and passing
  // newPost to child and add an object to it to trigger the
  // useEffect at parent level.
  const [newPost, setNewPost] = useState({})
  const [newText, setNewText] = useState({ text: '' })
  // useEffect run before render
  // render and then retun JSX
  useEffect(() => {
    postIndex(user)
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch()
  }, [newPost, post, newText])

  return (
    <div>
      <Container fluid>
        <Row>
          <div className="post-main">
            <div className="post-profile">
              <div className="post-profie-child">
                <PostCreate
                  user={user}
                  newPost={newPost}
                  post={post}
                  setPost={setPost}
                  msgAlert={msgAlert}
                  setImg={setImg}
                  setNewPost={setNewPost}
                  posts={posts}/>
              </div>
            </div>
            <div className="post-post">
              <Col md={8} lg={12}>
                {
                  posts.map((post, i) => (
                    <PostChild
                      key={i}
                      setNewText={setNewText}
                      text={post.text}
                      posts={posts}
                      postId={post._id}
                      user={user}
                      owner={post.owner}
                      msgAlert={msgAlert} />
                  ))
                }
              </Col>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default PostIndex

import React, { useState, useEffect } from 'react'
import './../../index.scss'
import { postIndex } from '../../api/post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt, faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

// import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const PostIndex = ({ user }) => {
  console.log(user)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    postIndex(user)
      .then(res => {
        console.log(res, ' this is res form post index')
        console.log(user)
        setPosts(res.data.posts)
      })
      .catch()
  }, [])
  const containerStyle = {
    border: 'black solid 1px',
    backgroundColor: 'white',
    margin: '10px'
  }
  const onDelete = () => {
    console.log('click delte!')
  }
  const onEdit = () => {
    console.log('click Edit!')
  }

  return (
    <Container fluid>
      {
        posts.map((post, i) => post.owner === user._id ? (
          <div style ={containerStyle}
            className="con"
            key={i}
            owner={post.owner}>
            <Col className="text">
              <div>
                {post.text}
              </div>
              <div className="icon">
                <FontAwesomeIcon onClick={onDelete} icon={ faTrashAlt } />
                <FontAwesomeIcon onClick={onEdit} icon={ faPencilAlt } />
              </div>
            </Col>
          </div>
        ) : (
          <div style ={containerStyle}
            className="con"
            key={i}
            owner={post.owner}>
            <Col className="text">
              <div>
                {post.text}
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={ faCommentDots } />
                <FontAwesomeIcon icon={ faThumbsUp } />
              </div>
            </Col>
          </div>
        ))
      }
    </Container>
  )
}
export default PostIndex

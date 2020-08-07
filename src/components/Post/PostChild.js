import React, { useState } from 'react'
import './../../index.scss'
import { postDelete } from '../../api/post'
import { Redirect } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt, faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const PostChild = ({ text, postId, userToken, owner, userId }) => {
  console.log(text, postId, userToken, owner, userId, 'all props')
  const [deleted, setDeleted] = useState(false)
  const containerStyle = {
    border: 'black solid 1px',
    backgroundColor: 'white',
    margin: '10px'
  }
  const onDelete = event => {
    event.preventDefault()
    console.log(postId)
    postDelete(postId, userToken)
      .then(() => {
        setDeleted(true)
      })
      .catch(console.error)
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/posts', state: { msg: 'Item succesfully deleted!' }
      }} />
    )
  }
  const onEdit = () => {
    console.log('click Edit!')
  }

  return (
    <div>
      {
        (owner === userId)
          ? <div style ={containerStyle} className="con">
            <Col className="text">
              <div>
                {text}
              </div>
              <div className="icon">
                <FontAwesomeIcon onClick={onDelete} icon={ faTrashAlt } />
                <FontAwesomeIcon onClick={onEdit} icon={ faPencilAlt } />
              </div>
            </Col>
          </div>
          : <div style ={containerStyle}
            className="con">
            <Col className="text">
              <div>
                {text}
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={ faCommentDots } />
                <FontAwesomeIcon icon={ faThumbsUp } />
              </div>
            </Col>
          </div>
      }
    </div>
  )
}
export default PostChild

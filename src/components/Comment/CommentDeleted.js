import React, { useState } from 'react'
import './../../index.scss'
import { commentDelete } from '../../api/comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const CommentDeleted = ({ msgAlert, setCommentDeleted, commentId, commenter, userId, comment }) => {
  console.log(commenter, ' this is commenter')
  console.log(userId, ' this is user Id')
  const [deleted, setDeleted] = useState(false)
  const onCommentDelete = event => {
    event.preventDefault()
    console.log(commentId)
    commentDelete(commentId)
      .then(() => {
        setDeleted(true)
      })
      .catch(() => msgAlert({
        heading: 'Unsuccessful Delete Comment',
        message: messages.cartArrayFailure,
        variant: 'danger'
      }))
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/posts', state: { msg: 'Item succesfully deleted!' }
      }} />
    )
  }

  return (
    <div className="comment-wrap">
      <div className="body">
        <div className="message">
          <span className="tip tip-left"></span>
          <div className="delete-comment-wrap">
            <p>{comment}</p>
            {
              (commenter === userId)
                ? <div className=""><FontAwesomeIcon
                  onClick={onCommentDelete}
                  icon={ faTrashAlt }
                  size="2x"/></div>
                : <p></p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default CommentDeleted

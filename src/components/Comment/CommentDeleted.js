import React, { useState } from 'react'
import './../../index.scss'
import { commentDelete } from '../../api/comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const CommentDeleted = ({ user, msgAlert, comment, owner, commenter }) => {
  console.log(comment, ' this is comment')
  console.log(user, 'this si user')
  const [deleted, setDeleted] = useState(false)
  const onCommentDelete = event => {
    event.preventDefault()
    commentDelete(comment._id)
      .then(() => {
        setDeleted(true)
      })
      .catch(() => msgAlert({
        heading: 'Unsuccessful Delete Comment',
        message: messages.commentFail,
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
          {
            (comment.commenter._id === user._id)
              ? <div className="delete-comment-wrap">
                <p>{comment.text}<span className="s-comment">comment by:{comment.commenter.email}</span></p>
                <div className=""><FontAwesomeIcon
                  onClick={onCommentDelete}
                  icon={ faTrashAlt }
                  size="2x"/></div>
              </div>
              : <p></p>
          }
        </div>
      </div>
    </div>
  )
}
export default CommentDeleted

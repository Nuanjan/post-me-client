import React, { useState, useEffect } from 'react'
import './../../index.scss'
import { postDelete, postUpdate, postShow } from '../../api/post'
import { commentCreate } from '../../api/comment'
import { Redirect } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt, faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import CommentDeleted from '../Comment/CommentDeleted'

const PostChild = ({ user, msgAlert, text, postId, owner, posts, setNewText, setNewCommet }) => {
  const [post, setPost] = useState({ text: '' })
  const [comment, setComment] = useState({})
  const [comments, setComments] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [deleted, setDeleted] = useState(false)
  // const [commentDeleted, setCommentDeleted] = useState(false)

  useEffect(() => {
    postShow(postId, user.token)
      .then(res => {
        console.log(res.data.post.comments)
        setComments(res.data.post.comments)
      })
      .catch(() => msgAlert({
        heading: 'Unsuccessful show post',
        message: messages.postFail,
        variant: 'danger'
      }))
  }, [comment])
  const handleChangePost = event => {
    event.persist()
    const updatedField = { [event.target.name]: event.target.value }
    const newPost = Object.assign({}, post, updatedField)
    setPost(newPost)
  }
  const handleSubmitPost = event => {
    event.preventDefault()
    postUpdate(user.token, post, postId)
      .then(res => {
        // this is make empty object have some Object
        // it will make useeffect at parent triiger
        setNewText({ text: post.text })
      })
      .catch(() => msgAlert({
        heading: 'Unsuccessful update Post',
        message: messages.postFail,
        variant: 'danger'
      }))
  }

  const handleChangeComment = event => {
    event.persist()
    const updatedField = { [event.target.name]: event.target.value }
    const newComment = Object.assign({}, comment, updatedField)
    setComment(newComment)
  }

  const onDelete = event => {
    event.preventDefault()
    postDelete(postId, user.token)
      .then(() => {
        setDeleted(true)
      })
      .catch(() => msgAlert({
        heading: 'Error Create post',
        message: messages.commentFail,
        variant: 'danger'
      }))
  }

  const handleSubmitComment = event => {
    event.preventDefault()
    commentCreate(user._id, postId, comment)
      .then(res => {
      // this is make empty object have some Object
      // it will make useeffect at parent triiger
      //  setNewComment(res.data.post)
        setComment({ text: '' })
      })
      // .then(() => setIsComment(true))
      .catch(() => msgAlert({
        heading: 'Error create comment',
        message: messages.commentFail,
        variant: 'danger'
      }))
  }
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/posts', state: { msg: 'Post succesfully deleted!' }
      }} />
    )
  }
  return (
    <div>
      {
        (owner._id === user._id)
          ? <div className="con">
            <Col className="text">
              <div className="tex-icon">
                <div className="post-detail">
                  <div>{text}</div>
                  <div>post by:<span>{owner.email}</span></div>
                </div>
                <div className="icon">
                  <FontAwesomeIcon onClick={onDelete} icon={ faTrashAlt } />
                  <FontAwesomeIcon
                    onClick={handleShow} icon={ faPencilAlt } />
                </div>
                {
                  comments.map((comment, i) => (
                    <div key={i} className="comment-wrap">
                      <div className="body">
                        <div className="message">
                          <span className="tip tip-left"></span>
                          <p >{comment.text}<span className="s-comment">comment by:{comment.commenter.email}</span></p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmitPost}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Change Post?</Form.Label>
                    <Form.Control as="textarea" rows="3"
                      onChange={handleChangePost}
                      name="text"
                      value={post.text} />
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                    Close
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleClose}
                      type="submit">
            Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </Col>
          </div>
          : <div
            className="con">
            <Col className="text">
              <div className="post-detail">
                <div>{text}</div>
                <div>post by:<span>{owner.email}</span></div>
              </div>
              <div className="icon">
                <FontAwesomeIcon onClick={handleShow} icon={ faCommentDots } />
                <FontAwesomeIcon icon={ faThumbsUp } />
              </div>
              {
                comments.map((comment, i) => (
                  <CommentDeleted key={i}
                    user={user}
                    owner={owner}
                    msgAlert={msgAlert}
                    comment={comment}
                  />
                ))
              }
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmitComment}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3"
                      onChange={handleChangeComment}
                      name="text"
                      value={comment.text} />
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                    Close
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleClose}
                      type="submit">
            Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </Col>
          </div>
      }
    </div>
  )
}
export default PostChild

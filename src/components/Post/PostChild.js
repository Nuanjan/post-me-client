import React, { useState } from 'react'
import './../../index.scss'
import { postDelete, postUpdate } from '../../api/post'
import { Redirect } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt, faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const PostChild = ({ text, postId, userToken, owner, userId, posts, setNewPost }) => {
  console.log(text, 'this is text\n',
    postId, 'this is post id\n',
    userToken, 'this is uer token\n',
    owner, ' this is owner of post\n',
    userId, ' this is user id')
  const [post, setPost] = useState({ text: '' })
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [deleted, setDeleted] = useState(false)
  const containerStyle = {
    border: 'black solid 1px',
    backgroundColor: 'white',
    margin: '10px'
  }

  const handleChange = event => {
    event.persist()
    const updatedField = { [event.target.name]: event.target.value }
    const newPost = Object.assign({}, post, updatedField)
    setPost(newPost)
  }
  const handleSubmit = event => {
    event.preventDefault()
    postUpdate(userToken, post, postId)
      .then(res => {
        // this is make empty object have some Object
        // it will make useeffect at parent triiger
        setNewPost(res.data.post)
        setPost({ text: '' })
        console.log(res.data.post, 'success edited')
      })
      .catch(console.error)
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
                <FontAwesomeIcon
                  onClick={handleShow} icon={ faPencilAlt } />
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3"
                      onChange={handleChange}
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

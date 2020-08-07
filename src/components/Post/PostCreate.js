import React, { useState, useEffect } from 'react'
import './../../index.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postCreate, postIndex } from '../../api/post'

const PostCreate = ({ user, setPosts, posts }) => {
  console.log(user, 'this is user for Post create')
  const userToken = user.token
  const [post, setPost] = useState({ text: '' })

  useEffect(() => {
    postIndex(user)
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch()
  }, [])
  const handleChange = event => {
    event.persist()
    setPost(prevPost => {
      const updatedField = { [event.target.name]: event.target.value }
      const newPost = Object.assign({}, prevPost, updatedField)
      return newPost
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    postCreate(userToken, post)
      .then(res => {
        console.log(res, 'success created')
      })
      .catch(console.error)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1" >
        <Form.Label>What You wanna Post today?</Form.Label>
        <Form.Control as="textarea" rows="3"
          onChange={handleChange}
          name="text"
          value={post.text}/>
      </Form.Group>
      <Button variant="danger" type="submit">Danger</Button>
    </Form>
  )
}
export default PostCreate

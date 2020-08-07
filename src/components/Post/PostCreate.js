import React, { useState } from 'react'
import './../../index.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { postCreate } from '../../api/post'

const PostCreate = (userToken) => {
  const [post, setPost] = useState({ text: '' })

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
        console.log(res, ' this is response for create')
        res.setStatus(201).json(res)
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

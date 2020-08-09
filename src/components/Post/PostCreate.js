import React, { useState } from 'react'
import './../../index.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProfileImg from '../UserContent/ProfileImg'
import { postCreate } from '../../api/post'

const PostCreate = ({ user, setNewPost, posts }) => {
  console.log(user, 'this is user for Post create')
  const userToken = user.token
  const [post, setPost] = useState({ text: '' })

  const handleChange = event => {
    event.persist()
    const updatedField = { [event.target.name]: event.target.value }
    const newPost = Object.assign({}, post, updatedField)
    setPost(newPost)
  }
  const handleSubmit = event => {
    event.preventDefault()
    postCreate(userToken, post)
      .then(res => {
        // this is make empty object have some Object
        // it will make useeffect at parent triiger
        setNewPost(res.data.post)
        setPost({ text: '' })
        console.log(res.data.post, 'success created')
      })
      .catch(console.error)
  }
  return (
    <div>
      <ProfileImg />
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
    </div>
  )
}
export default PostCreate

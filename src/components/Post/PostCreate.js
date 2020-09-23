import React from 'react'
import './../../index.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import ProfileImg from '../UserContent/ProfileImg'
import ShowImage from '../UserContent/ShowImage'
import { postCreate } from '../../api/post'
import messages from '../AutoDismissAlert/messages'

const PostCreate = ({ msgAlert, user, setNewPost, posts, newPost, post, setPost }) => {
  const userToken = user.token

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
        console.log(res.data.post)
        // this is make empty object have some Object
        // it will make useeffect at parent triiger
        setNewPost(res.data.post)
        setPost({ text: '' })
        return newPost
      })
      .catch(() => msgAlert({
        heading: 'Error Create post',
        message: messages.cartArrayFailure,
        variant: 'danger'
      }))
  }
  return (
    <div>
      <ShowImage
        user={user} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1" >
          <Form.Label>What You wanna Post today?</Form.Label>
          <Form.Control as="textarea" rows="3"
            onChange={handleChange}
            name="text"
            value={post.text}/>
        </Form.Group>
        <Button variant="danger" type="submit" className="btn-red btn btn-primary btn-lg btn-block">Post Me</Button>
      </Form>
    </div>
  )
}
export default PostCreate

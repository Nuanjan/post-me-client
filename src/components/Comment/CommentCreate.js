// import React, { useState } from 'react'
// import './../../index.scss'
// import { commentCreate } from '../../api/comment'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
//
// const CommentCreate = ({ userId, postId, setNewComment, comments, show, handleClose }) => {
//   const [comment, setComment] = useState({ text: '' })
//   const handleSubmitComment = event => {
//     event.preventDefault()
//     console.log(comment, ' this is comment to pass in to api')
//     commentCreate(userId, postId, comment)
//       .then(res => {
//       // this is make empty object have some Object
//       // it will make useeffect at parent triiger
//       //  setNewComment(res.data.post)
//         setComment(res.data.post)
//         console.log(res.data.post, 'success comment')
//       })
//       // .then(() => setIsComment(true))
//       .catch(console.error)
//   }
//
//   const handleChangeComment = event => {
//     event.persist()
//     const updatedField = { [event.target.name]: event.target.value }
//     const newComment = Object.assign({}, comment, updatedField)
//     setComment(newComment)
//   }
//   return (
//     <div>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Post</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmitComment}>
//           <Form.Group controlId="exampleForm.ControlTextarea1">
//             <Form.Label>Example textarea</Form.Label>
//             <Form.Control as="textarea" rows="3"
//               onChange={handleChangeComment}
//               name="text"
//               value={comment.text} />
//           </Form.Group>
//           <Modal.Footer>
//             <Button variant="warning" onClick={handleClose}>
//             Close
//             </Button>
//             <Button
//               variant="danger"
//               onClick={handleClose}
//               type="submit">
//     Save Changes
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//       <p>{comments}</p>
//     </div>
//   )
// }
// export default CommentCreate

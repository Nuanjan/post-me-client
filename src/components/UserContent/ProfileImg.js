import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormControl, ControlLabel, Button } from 'react-bootstrap'

class ProfileImg extends Component {
  handleSubmit (e) {
    if (e.target.input.files.length) {
      const uploadFile = e.target.input.files[0]
      const formData = new FormData()
      formData.append('file', uploadFile)
      axios.post(this.props.cfg_url + '/upload', formData)
        .then(function (response) {
          console.log('successfully uploaded', uploadFile)
        })
    } else {
      console.log('You need to select a file')
    }
  }

  render () {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <Form.Group controlId='uploadFormId'>
          <ControlLabel>Upload File:</ControlLabel>
          <FormControl
            type='file'
            name="input-file"
            label='File'
          />
        </Form.Group>
        <Button type='submit'>Upload</Button>
      </Form>
    )
  }
}

export default ProfileImg

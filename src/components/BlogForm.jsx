import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit }) => {
  const [blogForm, setBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const addBlog = (event) => {
    event.preventDefault()
    try {
      onSubmit(blogForm)

    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={addBlog}>
      <label>title</label> <input value={blogForm.title} id="title" onChange={({ target }) => setBlog({ ...blogForm, title: target.value })} type='text' name='title' />
      <br /><label >author</label><input value={blogForm.author} id="author" onChange={({ target }) => setBlog({ ...blogForm, author: target.value })} type='text' name='author' />
      <br /><label >url</label><input value={blogForm.url} id="url" onChange={({ target }) => setBlog({ ...blogForm, url: target.value })} type='text' name='url' />

      <button type="submit" id='send'>save</button>
    </form>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,

}

export default BlogForm
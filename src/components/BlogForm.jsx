import { useState } from 'react'

const BlogForm = ({onSubmit , onChangeTitle , onChangeAuthor,onChangeUrl, onChangeLike}) => {
  const [blogForm, setBlog] = useState({ title: '', author: '', url: '', likes: '' })

  const addBlog = (event) => {
    event.preventDefault()
    try {
     onSubmit(blogForm)

    }
    catch (error) {
     
    }

  }

return (
  <form onSubmit={addBlog}>
    <label>title</label> <input value={blogForm.title} id="title" onChange={({ target }) => setBlog({ ...blogForm, title: target.value })} type='text' name='title' />
    <br /><label >author</label><input value={blogForm.author} id="author" onChange={({ target }) => setBlog({ ...blogForm, author: target.value })} type='text' name='author' />
    <br /><label >url</label><input value={blogForm.url} id="url" onChange={({ target }) => setBlog({ ...blogForm, url: target.value })} type='text' name='url' />
    <br /><label >likes</label><input value={blogForm.likes} id="likes" onChange={({ target }) => setBlog({ ...blogForm, likes: target.value })} type='text' name='likes' />
    <button type="submit">save</button>
  </form>
)}

export default BlogForm
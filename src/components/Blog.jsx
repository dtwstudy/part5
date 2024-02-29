import { useState, useEffect, useRef } from 'react'
import Togglable from '../components/Togglable'


const Blog = ({ blog ,hadleOnLike ,hadleOnDelete}) =>
{  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogFormRef = useRef()
  const UpdateLike = (blog) => {
  
  const newLike = (blog.likes == null)?{...blog , likes: 0 } : {...blog , likes: blog.likes + 1 }
    hadleOnLike(newLike)
   
  }
  const onDelete = (id) => {
    hadleOnDelete(id)
  }
  return (
  <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel="show" name="hide" ref={blogFormRef}>
      <p>{blog.url}  </p>
      <p> {blog.likes} <button onClick={()=>UpdateLike(blog)}>like</button> </p>
      <p> {blog.author} </p>
      <button onClick={()=>onDelete(blog.id)}>delete</button>
    </Togglable>
  </div>  
)}

export default Blog
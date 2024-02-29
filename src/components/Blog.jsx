import { useState, useEffect, useRef } from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog }) =>
{  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogFormRef = useRef()
  return (
  <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel="show" name="hide" ref={blogFormRef}>
      <p>{blog.url}  </p>
      <p> {blog.likes}</p>
      <p> {blog.author}</p>
    </Togglable>
  </div>  
)}

export default Blog
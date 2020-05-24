import React, { useState } from 'react'


const Blog = (props) => {
  const [details, setDetails] = useState(false)

  const { blog, likeBlog } = props

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetails(!details)
  }

  if (!details) {
    return (
      <div className='blog' style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button className="view-btn" onClick={toggleDetails}>view</button>
        </div>
      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>hide</button>
        <div>{blog.url}</div>
        <div className='likes'>
          likes: <span className='likes-num'>{blog.likes}</span>
          <button onClick={() => likeBlog({ ...blog, likes: blog.likes + 1 })}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  )


}

export default Blog

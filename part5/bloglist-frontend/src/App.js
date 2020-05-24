import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    isError: true
  })
  const noteFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const clearNotifs = () => {
    setTimeout(() => {
      setNotification({
        message: null,
        isError: true
      })
    }, 5000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (error) {
      setNotification({
        message: 'wrong username or password',
        isError: true
      })
      clearNotifs()
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const submitBlogForm = async blogForm => {
    noteFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogForm)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `a new blog '${newBlog.title}' added`,
        isError: false
      })
      clearNotifs()
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isError: true
      })
      clearNotifs()
    }
  }

  const submitLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch (error) {
      setNotification({
        message: error.message,
        isError: true
      })
      clearNotifs()
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`))
      try {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification({
          message: `${blog.title} successfully removed`,
          isError: false
        })
        clearNotifs()
      } catch (error) {
        setNotification({
          message: error.message,
          isError: true
        })
        clearNotifs()
      }
  }

  if (user === null) {
    return (
      <div>
        <LoginForm handleLogin={handleLogin}>
          <Notification isError={notification.isError} message={notification.message} />
        </LoginForm>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification isError={notification.isError} message={notification.message} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel='new blog' ref={noteFormRef}>
          <BlogForm handleSubmit={submitBlogForm} />
        </Togglable>
      </div>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={submitLike}>
            {user.name === blog.user.name && user.username === blog.user.username && <button id='delete-blog' onClick={() => deleteBlog(blog)}>remove</button>}
          </Blog>
        )}
      </div>
    </div>
  )
}

export default App
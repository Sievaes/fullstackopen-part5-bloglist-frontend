import { useState, useEffect, useRef } from "react"
import LoginForm from "./components/LoginForm"
import Blog from "./components/Blog"
import Togglable from "./components/Togglable"
import loginServer from "./services/login"
import blogService from "./services/blogs"
import BlogForm from "./components/BlogForm"
import NotificationField from "./components/NotificationField"
import errorHandler from "./utils/errorHandler"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState("")
  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  //check if token already stored in localstorage
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll()
        setBlogs(response.sort((a, b) => b.likes - a.likes))
      } catch (error) {
        setIsError(true)
        errorHandler(error, setNotification)
      }
    }
    fetchBlogs()
  }, [])

  //Handle login
  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginServer.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
      setIsError(false)
      setNotification("Login successful")
    } catch (error) {
      setIsError(true)
      errorHandler(error, setNotification)
    }
  }

  //Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    blogService.setToken(null)
  }

  //Add new blog
  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.addBlog(newBlog)

      //will also add user to the blog, otherwise it wouldnt be shown before refresh
      setBlogs(blogs.concat({ ...response, user }))

      setNotification(
        `a new blog ${response.title} by ${response.author} added`
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setIsError(true)
      errorHandler(error, setNotification)
    }
  }

  const handleNewLike = async (newBlog, id) => {
    try {
      const response = await blogService.addLike(newBlog, id)

      setBlogs((prevBlogs) =>
        prevBlogs
          .map((blog) => (blog.id === id ? response : blog))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      errorHandler(error, setNotification)
    }
  }

  const handleDeleteBlog = async (blogs) => {
    const { title, author, id } = blogs

    try {
      const response = await blogService.deleteBlog(id)
      if (response === 200) {
        setNotification(`${title} from ${author} deleted`)
      }
      setBlogs((prevlogs) => prevlogs.filter((b) => b.id !== id))
    } catch (error) {
      console.log(error)
      errorHandler(error, setNotification)
    }
  }
  return (
    <div>
      {!user && <h2>Login</h2>}
      {user && <h2>Blogs</h2>}
      <NotificationField
        notification={notification}
        setNotification={setNotification}
        isError={isError}
        setIsError={setIsError}
      />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <p>
            {`User ${user.name} logged in`}{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      )}

      {user && (
        <div>
          <Togglable buttonLabel={"Add Blog"} ref={blogFormRef}>
            <BlogForm
              setBlogs={setBlogs}
              handleNewBlog={handleNewBlog}
              handleNewLike={handleNewLike}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleNewLike={handleNewLike}
              handleDeleteBlog={handleDeleteBlog}
              username={user.username}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App

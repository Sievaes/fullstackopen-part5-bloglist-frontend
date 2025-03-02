import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import loginServer from "./services/login";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import NotificationField from "./components/NotificationField";
import errorHandler from "./utils/errorHandler";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);
  const blogFormRef = useRef();

  //check if token already stored in localstorage
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll();
        setBlogs(response);
      } catch (error) {
        setIsError(true);
        errorHandler(error, setNotification);
      }
    };
    fetchBlogs();
  }, []);

  //Handle login
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginServer.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      setIsError(false);
      setNotification("Login successful");
    } catch (error) {
      setIsError(true);
      errorHandler(error, setNotification);
    }
  };

  //Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
  };

  //Add new blog
  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.addBlog(newBlog);
      setBlogs(blogs.concat(response));
      const { title, author, url } = response;
      setNotification(`a new blog ${title} by ${author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setIsError(true);
      errorHandler(error, setNotification);
    }
  };
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
          handleLogin={handleLogin}
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
            <BlogForm setBlogs={setBlogs} handleNewBlog={handleNewBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

import { useState } from "react"
import blogService from "../services/blogs"
import errorHandler from "../utils/errorHandler"

const Blog = ({ blog, handleNewLike, handleDeleteBlog, username }) => {
  const [informationVisible, setInformationVisible] = useState(false)
  const isBlogMadeByThisUser = username === blog.user.username ? true : false

  //blogstyle "CSS"
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: "lightblue",
    borderRadius: "3px",
  }

  const toggleVisibility = () => {
    setInformationVisible((prev) => !prev)
  }

  const addLike = () => {
    const id = blog.id

    const newBlog = {
      user: blog.user.id,
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
    }
    handleNewLike(newBlog, id)
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <button onClick={toggleVisibility}>
        {informationVisible ? "Hide" : "Show"}
      </button>
      {informationVisible && (
        <div>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={addLike}>Like</button>
          </p>
          <p>Added by: {blog.user.name}</p>
          {isBlogMadeByThisUser && (
            <button style={removeButtonStyle} onClick={deleteBlog}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

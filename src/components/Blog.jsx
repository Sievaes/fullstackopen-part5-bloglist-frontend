import { useState } from "react"
import blogService from "../services/blogs"
import errorHandler from "../utils/errorHandler"

const Blog = ({ blog, handleNewLike, handleDeleteBlog }) => {
  const [informationVisible, setInformationVisible] = useState(false)

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
      {blog.title}{" "}
      <button onClick={toggleVisibility}>
        {informationVisible ? "Hide" : "Show"}
      </button>
      {informationVisible && (
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button onClick={addLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          <button style={removeButtonStyle} onClick={deleteBlog}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog

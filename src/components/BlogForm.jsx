import { useState } from "react"

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const onSubmit = (event) => {
    event.preventDefault() // Prevent the default form submission behavior

    handleNewBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        Title{" "}
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title"
          data-testid="title"
        />
      </div>
      <div>
        Author{" "}
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author"
          data-testid="author"
        ></input>
      </div>
      <div>
        Url{" "}
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="url"
          data-testid="url"
        ></input>
      </div>
      <button>Add Blog</button>
    </form>
  )
}

export default BlogForm

import { useState } from "react";
import Blog from "./Blog";

const BlogForm = ({ blogs, handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleNewBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Title{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          Url{" "}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button>Add Blog</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogForm;

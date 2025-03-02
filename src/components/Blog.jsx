import { useState } from "react";

const Blog = ({ blog }) => {
  const [informationVisible, setInformationVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setInformationVisible((prev) => !prev);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      {informationVisible && (
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button>Like</button>
          </p>
        </div>
      )}
      <button onClick={toggleVisibility}>
        {informationVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default Blog;

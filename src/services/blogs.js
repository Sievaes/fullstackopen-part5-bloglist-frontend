import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (error) {
    throw error;
  }
};

//POST new blog
const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addLike = async (newBlog, id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);

    return response.status;
  } catch (error) {
    throw error;
  }
};

export default { getAll, setToken, addBlog, addLike, deleteBlog };

const errorHandler = (error, setNotification) => {
  console.log("ERROR RESPONSE DEBUG:", error.response)
  if (error.response) {
    if (error.response.statusText === "Internal Server Error") {
      setNotification("Error: Unable to connect to the database")
    } else if (error.response.statusText === "Authorization") {
      setNotification("Error: couldn't add a new blog")
    } else if (error.response.data.error === "Title and URL are required") {
      setNotification("Error: Title and URL required")
    } else if (error.response.status === 401) {
      setNotification("Wrong username or password")
    } else {
      setNotification("Error occured")
    }
  }
}

export default errorHandler

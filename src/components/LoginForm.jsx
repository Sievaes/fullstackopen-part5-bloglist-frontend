import PropTypes from "prop-types"

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
}) => {
  LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {" "}
        Username{" "}
        <input
          type="text"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        {" "}
        Password{" "}
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Login</button>
      </div>
    </form>
  )
}

export default LoginForm

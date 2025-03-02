const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
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
          type="text"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;

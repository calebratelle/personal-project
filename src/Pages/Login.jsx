import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(register ? "/api/register" : "/api/login", { username, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {register ? (
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <h1>Welcome! Please register below</h1>
          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
      ) : (
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <h1>Welcome! Please login below</h1>
          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
      )}
  
      <button onClick ={()=> setRegister(!register)}>
        Need to {register ? "login?" : "register?"}
      </button>
    </>
  );
  
};

export default Login;

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(register ? "/api/register" : "/api/login", { username, password })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "LOGIN", payload: res.data.userId });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              {register ? (
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <h1 className="mb-4">Welcome! Please register below</h1>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary">Submit</button>
                </form>
              ) : (
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <h1 className="mb-4">Welcome! Please login below</h1>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary">Submit</button>
                </form>
              )}

              <button
                className="btn btn-secondary mt-3"
                onClick={() => setRegister(!register)}
              >
                Need to {register ? "login?" : "register?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

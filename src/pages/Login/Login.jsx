import { useState } from "react";
import { getUserLogin } from "../../services/dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import routePaths from "../../routes/routhPaths";

const Login = () => {
  const history = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const handleChnageInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValue((pre) => {
      return { ...pre, [name]: value };
    });
  };

  //Handle submit user login
  const handleChangeSubmit = (e) => {
    e.preventDefault();
    let loginData = { email: inputValue.email, password: inputValue.password };
    // getUserLogin(loginData)
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((err) => err);
    axios
      .post("http://localhost:4004/api/v1/auth/login", loginData)
      .then((res) => {
        console.log("res", res);
        if (res.data.success === true) {
          localStorage.setItem("user", JSON.stringify(res.data));
          history(routePaths.root);
        }
      })
      .catch((err) => err);
  };
  return (
    <div className="login_main_container">
      <div className="login_body">
        <div className="login_wrapper">
          <form onSubmit={handleChangeSubmit}>
            <div className="input_div">
              <input
                type="text"
                onChange={handleChnageInput}
                placeholder="Enter email"
                name="email"
                value={inputValue.email}
              />
              {/* <img src={emailIcon} alt="email" /> */}
            </div>
            <div className="input_div">
              <input
                type="text"
                onChange={handleChnageInput}
                placeholder="Enter password"
                name="password"
                value={inputValue.password}
              />
            </div>
            <div className="forget_pdw_con">
              <small>Forgot password ?</small>
              <small>Sign up</small>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

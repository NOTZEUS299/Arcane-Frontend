import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../../Header";
import { axiosIntance as axios } from "../../../Base-Url/AxiosInstance";
import "./SignUp.css";

export const SignUp = () => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate()

  const handleOneSubmit = async () => {
    await axios.post("/signup", userData).then((x) => {
        localStorage.setItem("token", JSON.stringify(x.data.token));
        localStorage.setItem("userData", JSON.stringify(x.data.user));
        console.log(x);
      })
      .finally(() => {
        navigate("/profile");
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      ;
    });
  };

  return (
    <div>
      <Header />
      <div className="fake-space-div" id="less-nav"></div>
      <div className="sign-up-page-container">
        <div className="sign-up-page-background">
          <div className="shape-one"></div>
          <div className="shape-two"></div>
          <div className="shape-three">
            <div></div>
          </div>
          <div className="shape-four">
            <div></div>
          </div>
          <div className="sign-up-form-container">
            <div className="sign-up-form-content">
              <h1>Sign Up</h1>
              <label htmlFor="name">Name :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    setUserData({ ...userData, firstName: e.target.value });
                  }}
                />
              </div>
              <label htmlFor="name">Phone No :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Your Phone Number"
                  onChange={(e) => {
                    setUserData({ ...userData, lastName: e.target.value });
                  }}
                />
              </div>
              <label htmlFor="name">Email :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>
              <label htmlFor="name">Password :</label>
              <div className="tooltip-container">
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Set Your Password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
              </div>
              <button onClick={() => handleOneSubmit()}>Sign Up</button>
              <p>
                Already Have Account? |{" "}
                <Link to={"/sign-in"} className="link-to-redirect">
                  Sign In
                </Link>
                ...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

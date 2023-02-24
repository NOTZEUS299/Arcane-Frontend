import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../../Header";
import { axiosIntance as axios } from "../../../Base-Url/AxiosInstance";
import {
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
} from "react-icons/bs";
import "./Login.css";

export const Login = () => {
  const [userData, setUserData] = useState({});
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  function valiDation() {
    let allow = false;

    if (validation.email === "" && validation.pass === "") {
      allow = true;
    } else {
      setValidation({ ...validation, email: "", pass: "" });
      setTimeout(() => {
        setValidation({ ...validation, email: "invalid", pass: "invalid" });
      }, 1);
      return allow;
    }

    return allow;
  }

  const handleOnSubmit = async () => {
    if (valiDation()) {
      await axios
        .post("/signin", userData)
        .then((x) => {
          localStorage.setItem("token", JSON.stringify(x.data.token));
          localStorage.setItem("userData", JSON.stringify(x.data.user));
          console.log(x);
        })
        .finally(() => {
          navigate("/profile");
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        });
    } else {
      alert("Enter Details Properly...");
    }
  };

  return (
    <div>
      <Header />
      <div className="fake-space-div" id="less-nav"></div>
      <div className="login-page-container">
        <div className="shape-one"></div>
        <div className="shape-two"></div>
        <div className="shape-three">
          <div></div>
        </div>
        <div className="shape-four">
          <div></div>
        </div>
        <div className="login-container">
          <div className={`login-content`}>
            <h1>Sign In</h1>
            <label htmlFor="username">User :</label>
            <div className="input-fiels-validation-container">
              <input
                type="text"
                id={`username-${validation.email}`}
                placeholder="Enter Your Email..."
                onChange={(e) => {
                  if (
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      e.target.value
                    )
                  ) {
                    setUserData({ ...userData, email: e.target.value });
                    setValidation({ ...validation, email: "" });
                  } else {
                    setValidation({ ...validation, email: "invalid" });
                  }
                }}
                required={true}
              />
              {validation.email === "" ? (
                <BsFillPatchCheckFill className="validation-icons" />
              ) : (
                <BsFillPatchExclamationFill className="validation-icons" />
              )}
            </div>
            <label htmlFor="pass">Password :</label>
            <div className="input-fiels-validation-container">
              <input
                type="password"
                name=""
                id={`pass-${validation.pass}`}
                placeholder="Enter Password..."
                onChange={(e) => {
                  if (e.target.value.length >= 6) {
                    setUserData({ ...userData, password: e.target.value });
                    setValidation({ ...validation, pass: "" });
                  } else {
                    setValidation({ ...validation, pass: "invalid" });
                  }
                }}
                required={true}
              />
              {validation.pass === "" ? (
                <BsFillPatchCheckFill className="validation-icons" />
              ) : (
                <BsFillPatchExclamationFill className="validation-icons" />
              )}
            </div>
            <button
              className="login-button"
              id="login-btn"
              onClick={() => handleOnSubmit()}
            >
              Sign In
            </button>
            <p>
              Don't Have An Account? |{" "}
              <Link to={"/sign-up"} className="link-to-redirect">
                Sign-Up
              </Link>
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

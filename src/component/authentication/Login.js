import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { loginFormConstantants, registerFormConstantants } from "../constants";
import { signIn } from "../../api";
import AuthContext from "../../context/AuthProvider";

export const Login = () => {
  const [loginFormFields, setLoginFormFields] = useState({});
  const [registerFormFields, setRegisterFormFields] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [showForm, setShowForm] = useState("login");
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const renderLoginForm = (formFieldConstants) => {
    return formFieldConstants?.map((item) => {
      return (
        <div className="col-12" key={item.key}>
          <div className="form-group">
            <label>{item?.label}</label>
            <input
              type={item?.type}
              placeholder={item?.label}
              className="form-control"
              name={item?.key}
              onChange={(e) => {
                // eslint-disable-next-line no-unused-expressions
                showForm === "login"
                  ? (setLoginFormFields({
                      ...loginFormFields,
                      [item.key]: e.target.value,
                    }),
                    setErrorMessage(""))
                  : setRegisterFormFields({
                      ...registerFormFields,
                      [item.key]: e.target.value,
                    });
              }}
            />
          </div>
        </div>
      );
    });
  };

  const handleLogin = () => {
    signIn(loginFormFields)?.then((res) => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("username", res.data.username);
        const updatedUser = {
          token: res.data.accessToken,
          username: res.data.username,
        };
        setAuth?.(updatedUser);
        navigate("/", { replace: true });
      }
      if (res?.response?.status === 401 || res?.response?.status === 404) {
        setErrorMessage(res?.response?.data?.message);
      }
    });
  };

  const handleRegister = () => {
    console.log("registerFormFields", registerFormFields);
  };

  const renderFormLink = (text, formValue) => {
    return (
      <>
        <div
          className="register-login-link"
          onClick={() => setShowForm(formValue)}
        >
          {text}
        </div>
        {formValue !== "login" ? (
          <div className="register-login-link forgot-link">
            I forgot my password
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="login-wrapper">
            <section className="content-header">
              <h1 className="login-heading">Sign In</h1>
            </section>
            <div className="box">
              <div className="box-body ">
                <div className="row">
                  {renderLoginForm(
                    showForm === "login"
                      ? loginFormConstantants
                      : registerFormConstantants
                  )}
                  {showForm === "login" ? (
                    <div className="error-message">{errorMessage}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-success btn-block btn-flat r-btn login-btn"
                      onClick={() =>
                        showForm === "login" ? handleLogin() : handleRegister()
                      }
                    >
                      {showForm === "login" ? "Sign In" : "Register"}
                    </button>
                  </div>
                </div>
                {showForm === "login"
                  ? renderFormLink("Register a new membership", "register")
                  : renderFormLink("I already have a membership", "login")}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "./configfb";

const LogIn = () => {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(emailState, passwordState);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="container">
        <div className="justify-content-center">
          <h1 className="form-floating d-flex justify-content-center p-4">
            Log In
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                value={emailState}
                onChange={(e) => {
                  setEmailState(e.target.value);
                }}
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                value={passwordState}
                onChange={(e) => {
                  setPasswordState(e.target.value);
                }}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg btn-success  px-4 m-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;

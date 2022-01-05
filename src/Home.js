import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import Header from "./components/Header";
import Form from "./components/Form";
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {currentUser ? (
        <div>
          <Header></Header>
          <div className="container">
            <Form></Form>
          </div>
        </div>
      ) : (
        <div className="h-100 d-flex bd-highlight m-4">
          <div className="p-2 flex-fill bd-highlight text-center ">
            <Link className="text-white text-decoration-none" to="/login">
              {" "}
              <button
                type="submit"
                className="btn btn-lg btn-success  px-4 m-4"
              >
                {" "}
                Log In
              </button>{" "}
            </Link>
          </div>
          <div className="p-2 flex-fill bd-highlight text-center">
            <Link className="text-white text-decoration-none" to="/signup">
              {" "}
              <button
                type="submit"
                className="btn btn-lg btn-success  px-4 m-4"
              >
                {" "}
                Sign Up
              </button>{" "}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

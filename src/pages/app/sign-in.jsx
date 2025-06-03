import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    navigate("/");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white p-4">
      <div className="row w-100 max-w-4xl rounded-4 overflow-hidden shadow-lg" style={{ maxWidth: 900 }}>
        {/* Left side */}
        <div className="col-md-6 bg-success d-flex flex-column align-items-center justify-content-center p-5 text-white position-relative">
          <img
            alt="White flame icon on green background"
            className="mb-4"
            height="60"
            src="https://storage.googleapis.com/a1aa/image/b3d52651-f2ad-4454-fcd5-81c75191bab1.jpg"
            width="60"
          />
          <p className="fs-5 fw-semibold mb-1">JobHive</p>
          <h2 className="fs-3 fw-semibold mb-3">Welcome Back!</h2>
          <p className="text-center small mb-4" style={{ maxWidth: 250 }}>
            To stay connected with us
            <br /> please login with your personal info
          </p>
          <button
            className="btn btn-outline-light rounded-pill px-4 py-2 text-uppercase fw-bold mb-2"
            onClick={() => navigate("/sign-up")}
          >
            SIGN UP
          </button>
        </div>
        {/* Right side */}
        <div className="col-md-6 bg-light d-flex flex-column justify-content-center p-5 rounded-end-4">
          <h1 className="text-success fw-bold display-6 mb-2">Welcome</h1>
          <p className="text-success small mb-4">Login in to your account to continue</p>
          <form className="d-flex flex-column gap-3 w-100" style={{ maxWidth: 320 }} onSubmit={handleSubmit}>
            <input
              className="form-control rounded-pill py-2 px-4 text-success mb-2"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control rounded-pill py-2 px-4 text-success mb-2"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-danger small">{error}</div>}
            <p className="small text-success text-end mb-2" style={{ cursor: "pointer", userSelect: "none" }}>
              Forget your password?
            </p>
            <button
              className="btn btn-success rounded-pill py-2 text-uppercase fw-bold mb-2"
              type="submit"
            >
              LOG IN
            </button>
          </form>
          <p className="small text-success mt-4">
            Don’t have an account?
            <span
              className="fw-semibold text-decoration-underline ms-1"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

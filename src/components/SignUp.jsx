import React, { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row w-100 rounded-4 overflow-hidden shadow-lg bg-white"
        style={{ maxWidth: 1000 }}
      >
        {/* Left: Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h2 className="display-6 fw-bold text-success mb-4 text-center">
            Create your account
          </h2>
          <form>
            {/* Name */}
            <label
              htmlFor="name"
              className="form-label fw-semibold mb-1 text-success"
            >
              Name
            </label>
            <div className="mb-3">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="form-control border-success"
                required
              />
            </div>

            {/* Email */}
            <label
              htmlFor="email"
              className="form-label fw-semibold mb-1 text-success"
            >
              Email
            </label>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-control border-success"
                required
              />
            </div>

            {/* Password */}
            <label
              htmlFor="password"
              className="form-label fw-semibold mb-1 text-success"
            >
              Password
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white border-success text-success">
                <i className="fas fa-shield-alt" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-control border-success"
              />
              <button
                type="button"
                title={showPassword ? "Hide password" : "Show password"}
                className="btn btn-outline-secondary border-success"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                <i
                  className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                />
              </button>
            </div>

            {/* Confirm Password */}
            <label
              htmlFor="confirmPassword"
              className="form-label fw-semibold mb-1 text-success"
            >
              Confirm Password
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white border-success text-success">
                <i className="fas fa-shield-alt" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                className="form-control border-success"
              />
              <button
                type="button"
                title={showConfirmPassword ? "Hide password" : "Show password"}
                className="btn btn-outline-secondary border-success"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
              >
                <i
                  className={
                    showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                  }
                />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-success w-100 mt-3 py-2 fw-semibold text-uppercase shadow-sm"
            >
              Sign Up
            </button>
          </form>
          <div className="my-4 text-center text-secondary">Or sign up with</div>
          <div className="d-flex flex-column flex-sm-row gap-3 mb-3">
            <a
              href="https://accounts.google.com/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger flex-fill d-flex align-items-center justify-content-center gap-2 fw-semibold"
            >
              <i className="fab fa-google"></i> Google
            </a>
            <a
              href="https://www.facebook.com/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2 fw-semibold"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a
              href="https://www.linkedin.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info flex-fill d-flex align-items-center justify-content-center gap-2 fw-semibold text-white"
            >
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
          <div className="text-center mt-2 small">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-success fw-semibold text-decoration-underline"
            >
              Sign in now
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light p-0">
          <img
            src="https://i.pinimg.com/736x/49/c9/e9/49c9e9d5e31fe14b89adbf5a50a11d1e.jpg"
            alt="JobHive sign up visual"
            className="img-fluid rounded-end-4"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "#f8f9fa",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.jpg";
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

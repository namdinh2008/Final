import React, { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 rounded-4 overflow-hidden shadow-lg bg-white" style={{ maxWidth: 1000 }}>
        {/* Left: Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h2 className="display-6 fw-bold text-success mb-4 text-center">Create your account</h2>
          <form>
            {/* Name */}
            <label htmlFor="name" className="form-label fw-semibold mb-1 text-success">
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
            <label htmlFor="email" className="form-label fw-semibold mb-1 text-success">
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
            <label htmlFor="password" className="form-label fw-semibold mb-1 text-success">
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
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
              </button>
            </div>

            {/* Confirm Password */}
            <label htmlFor="confirmPassword" className="form-label fw-semibold mb-1 text-success">
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
                <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
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
            <a href="/sign-in" className="text-success fw-semibold text-decoration-underline">
              Sign in now
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light p-0">
          <img
            src="data:image/jpeg;base64,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"
            alt="JobHive sign up visual"
            className="img-fluid rounded-end-4"
            style={{ width: "100%", height: "100%", objectFit: "cover", background: "#f8f9fa" }}
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

"use client"

import { Navbar, Nav, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm py-3 sticky-top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary d-flex align-items-center gap-2">
          <i className="bi bi-briefcase-fill"></i> {/* Bootstrap icon for visual enhancement */}
          JobHive
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Navigation Links */}
          <Nav className="me-auto ms-lg-5 gap-lg-4">
            {[
              { to: "/", label: "Home" },
              { to: "/saved-jobs", label: "Saved Jobs" },
              { to: "/feedback", label: "Feedback" },
              { to: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Nav.Link
                key={link.to}
                as={Link}
                to={link.to}
                className="text-muted fw-medium hover-opacity"
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Auth Buttons */}
          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <Button variant="outline-primary" className="px-4 rounded-pill">
              Sign In
            </Button>
            <Button variant="primary" className="px-4 rounded-pill">
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

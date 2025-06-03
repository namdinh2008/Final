"use client";

import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Header() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom shadow-sm py-3 sticky-top"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-success d-flex align-items-center gap-2"
        >
          <Briefcase className="h-6 w-6 text-success" />
          <span>JobHive</span>
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
            <Button
              as={Link}
              to="/sign-in"
              variant="outline-success"
              className="px-4 rounded-pill"
            >
              Sign In
            </Button>
            <Button
              as={Link}
              to="/sign-up"
              variant="success"
              className="px-4 rounded-pill"
            >
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

"use client"

import { useState } from "react"
import { Navbar, Nav, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          JobHive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/saved-jobs">
              Saved Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/feedback">
              Feedback
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button variant="outline-primary">Sign In</Button>
            <Button variant="primary">Sign Up</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Briefcase } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-top shadow-sm pt-5 pb-3 mt-5">
      <Container>
        <Row className="gy-4">
          {/* Branding */}
          <Col md={3}>
            <h4 className="fw-bold text-primary d-flex align-items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span>JobHive</span>
            </h4>
            <p className="text-muted small mb-0">
              Helping you find your dream job with top companies and smart tools.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h6 className="text-uppercase fw-semibold text-dark mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              {[
                { to: "/", label: "Home" },
                { to: "/saved-jobs", label: "Saved Jobs" },
                { to: "/feedback", label: "Feedback" },
              ].map((link) => (
                <li key={link.to} className="mb-2">
                  <Link to={link.to} className="text-muted text-decoration-none hover-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Categories */}
          <Col md={3}>
            <h6 className="text-uppercase fw-semibold text-dark mb-3">Categories</h6>
            <ul className="list-unstyled small">
              {[
                ["it", "IT & Software"],
                ["marketing", "Marketing"],
                ["finance", "Finance"],
              ].map(([slug, label]) => (
                <li key={slug} className="mb-2">
                  <Link to={`/?category=${slug}`} className="text-muted text-decoration-none hover-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h6 className="text-uppercase fw-semibold text-dark mb-3">Contact</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">123 Job Street, Career City</li>
              <li className="mb-2">
                <a href="mailto:info@jobhive.com" className="text-muted text-decoration-none hover-link">
                  info@jobhive.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-decoration-none hover-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom */}
        <div className="text-center pt-4 mt-4 border-top small text-muted">
          © {new Date().getFullYear()} JobHive. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}

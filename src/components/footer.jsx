import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-light border-top py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>JobHive</h5>
            <p className="text-muted">Helping you find your dream job.</p>
          </Col>
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-muted">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-muted">
                  Feedback
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Categories</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/?category=it" className="text-muted">
                  IT & Software
                </Link>
              </li>
              <li>
                <Link to="/?category=marketing" className="text-muted">
                  Marketing
                </Link>
              </li>
              <li>
                <Link to="/?category=finance" className="text-muted">
                  Finance
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Contact</h6>
            <ul className="list-unstyled">
              <li className="text-muted">123 Job Street, Career City</li>
              <li>
                <a href="mailto:info@jobhive.com" className="text-muted">
                  info@jobhive.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-muted">
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

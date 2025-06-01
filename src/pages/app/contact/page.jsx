import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "react-bootstrap";

export default function ContactPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 text-center">
          <h1 className="display-4 font-weight-bold">Contact Us</h1>
          <p className="lead text-muted">
            Have questions or need assistance? We're here to help.
          </p>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <Mail className="mb-2" size={40} />
              <h5 className="card-title">Email</h5>
              <p className="card-text">
                <a
                  href="mailto:info@jobhive.com"
                  className="text-decoration-none text-success"
                >
                  info@jobhive.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <Phone className="mb-2" size={40} />
              <h5 className="card-title">Phone</h5>
              <p className="card-text">
                <a
                  href="tel:+1234567890"
                  className="text-decoration-none text-success"
                >
                  +1234567890
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <MapPin className="mb-2" size={40} />
              <h5 className="card-title">Office</h5>
              <p className="card-text">123 Job Street, Career City</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <Card className="mt-4 shadow-lg">
          <Card.Header>
            <Card.Title>Our Location</Card.Title>
            <Card.Text>
              Visit our office or send us mail at this address.
            </Card.Text>
          </Card.Header>
          <Card.Body>
            <div className="aspect-video w-100 overflow-hidden rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941512199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1620796614538!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="JobHive Office Location"
              ></iframe>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

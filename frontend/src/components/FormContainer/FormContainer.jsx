import { Container, Row, Col } from "react-bootstrap";

// This component is used to wrap the form elements in a container
// and center them on the screen. It is used in the Login and Register pages.
function FormContainer({ children }) {
  return (
    <Container>
      {/* on medium screen, justify the content to the center */}
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;

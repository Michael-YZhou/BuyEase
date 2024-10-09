import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear(); // Get the current year

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>BuyEase &copy; {year}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

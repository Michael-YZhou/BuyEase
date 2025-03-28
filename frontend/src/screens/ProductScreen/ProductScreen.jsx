import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Rating from "../../components/Rating/Rating";

const ProductScreen = () => {
  // get the product id from the URL using the useParams hook
  const { id: productId } = useParams();

  // fetch the product details using the useGetProductByIdQuery hook
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {
        // if the data is loading, display a loading message
        isLoading ? (
          <Loader />
        ) : // if there is an error fetching the data, display an error message
        isError ? (
          <h2>{error}</h2>
        ) : (
          // if the product exists, display the product details

          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={4}>
              {/* display the product details in a list group, variant flush removes the borders */}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {
                          // if the product is in stock, display "In Stock", otherwise display "Out of Stock"
                          product.countInStock > 0 ? "In Stock" : "Out of Stock"
                        }
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      // disable the button if the product is out of stock
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      }
    </>
  );
};

export default ProductScreen;

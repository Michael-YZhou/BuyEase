import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              // responsive grid layout for products
              <Col
                id={product._id}
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";

const HomeScreen = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
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

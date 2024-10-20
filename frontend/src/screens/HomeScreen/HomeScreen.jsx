import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";

const HomeScreen = () => {
  // useState to store products data from the backend
  const [products, setProducts] = useState([]);

  // useEffect to fetch products data from the backend and set the products state
  // empty dependency array to run the effect only once after the initial render
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          // responsive grid layout for products
          <Col id={product._id} key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

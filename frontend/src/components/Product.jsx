import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  console.log(`assets${product.image}`);

  return (
    <Card className="my-3 p-3 rounded">
      {/* Add a link to the product details page. Link is a component from react-router-dom */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      {/* Add the product name and price */}
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="h3">${product.price}</Card.Text>
    </Card>
  );
};

export default Product;

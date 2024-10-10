import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  console.log(`assets${product.image}`);

  return (
    <Card className="my-3 p-3 rounded">
      {/* Add a link to the product image */}
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      {/* Add the product name and price */}
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
      </Card.Body>

      <Card.Text as="h3">${product.price}</Card.Text>
    </Card>
  );
};

export default Product;

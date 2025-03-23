export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
export const PRODUCTS_URL = "/api/products";
export const USER_URL = "/api/users";
export const ORDER_URL = "/api/orders";
export const PAYMENT_URL = "/api/config/paypal";

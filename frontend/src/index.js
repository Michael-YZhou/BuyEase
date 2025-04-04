import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

const router = createBrowserRouter(
  // Create routes for the application using the Route component
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Add a route for the home screen. The index prop is set to true to make this the default route */}
      <Route index={true} path="/" element={<HomeScreen />} />
      {/* Add a route for the product screen with a dynamic parameter for the product id */}
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrap the application with the Provider component to provide the Redux store */}
    <StoreProvider store={store}>
      {/* Wrap the application with the RouterProvider component to provide the router context */}
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();

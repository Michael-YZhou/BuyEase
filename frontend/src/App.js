import React from "react";
import { Container } from "react-bootstrap";
// import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {/* Replace the HomeScreen component with the Outlet component */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

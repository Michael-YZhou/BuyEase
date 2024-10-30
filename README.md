# BuyEase

> **Status**: Work in Progress

## Project Description

**BuyEase** is a dynamic and responsive e-commerce platform designed to deliver a seamless shopping experience. The platform enables secure user account management through authentication features, allowing users to register, log in, and manage their profiles. Integrated with PayPal as the primary payment gateway, BuyEase ensures reliable and secure transactions for all users.

Users can effortlessly browse products, add items to their cart, and complete purchases. The website's modern UI and efficient backend make it an ideal solution for online shopping.

## Features

- **User Authentication**: Secure registration, login, and profile management.
- **Payment Integration**: PayPal integration for secure and reliable payments.
- **Product Browsing and Cart Management**: Users can explore available products, add items to their shopping cart, and checkout with ease.
- **Responsive Design**: Mobile-friendly UI for an optimal experience across devices.

## User Interface

![User Interface Screenshot](/ui-Screenshot.jpg)

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment**: PayPal API integration

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Michael-YZhou/BuyEase.git
   cd buyease

   ```

2. **Install dependencies:**

   **Backend**

   ```bash
   npm install

   ```

   **Frontend**

   ```bash
   cd frontend
   npm install

   ```

3. **Set up environment variables:**

   - MONGODB_URI=your_mongo_db_uri

   - PAYPAL_CLIENT_ID=your_paypal_client_id

   - JWT_SECRET=your_jwt_secret

4. **Start the application:**

   Backend:

   ```bash
   npm start

   ```

   Frontend:

   ```bash
   cd frontend
   npm start

   ```

5. **Access the application:**

   Open your browser and navigate to http://localhost:3000.

## License

This project is licensed under the MIT License.

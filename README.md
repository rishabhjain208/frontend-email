# Email Marketing Sequence Application

This application allows users to design and implement email marketing sequences using a visual flowchart interface. Users can create and schedule emails based on predefined sequences and time delays.

## Features

- **Visual Flowchart Interface:** Utilizes ReactFlow library for creating and managing email sequences visually.
- **Node Types Supported:**
  - Cold Email: Send initial cold emails to recipients.
  - Wait/Delay: Introduce delays between email sends.
  - Lead Source: Track sources of leads for analytics.
- **Email Scheduling:** Emails can be scheduled based on the flowchart and time delays defined by the user.
- **Backend Integration:** Uses Agenda and Nodemailer to handle backend tasks and email delivery.
- **User Authentication:** Secure user registration and login functionality.
- **Responsive UI:** Designed for optimal user experience across devices.
- **RESTful API:** Backend API endpoints follow REST principles for clear and predictable behavior.

## Technologies Used

- **Frontend:** React, React Flow, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **Libraries:** Agenda, Nodemailer
- **Database:** MongoDB

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>

   ```

2. Install dependencies for both frontend and backend:

   ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install

   ```

3. **Set up environment variables**

   ```bash
   # Add the following environment variables to .env
   MONGO_URI=your-mongodb-uri
   useremail=your-smtp-email
   password=your-smtp-password
   JWT_SECRET=your-jwt-secret

   ```

4. **Start the server**

   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend
   npm run dev

   ```

### API Endpoints

## Authentication

- **GET /**: Check if the server is running.
- **POST POST /api/v1/auth/signup**: Register a new user.
- **POST /api/auth/signin**: Login a user.

## Email Management

- **POST /api/v1/email/sendmail:**: Send an email immediately or schedule it for later.

## Middleware

- **Authentication middleware (auth)**: Verifies JWT token for protected routes.

## Libraries Used

- **Express**: Web framework for Node.js.
- **Agenda**: Lightweight job scheduling for Node.js.
- **Nodemailer**: Send emails from Node.js applications.
- **ReactFlow**: React library for building interactive node-based interfaces.
- **React Router**: Declarative routing for React applications.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcrypt**: Password hashing library for secure password storage.

## Contributors

- **Rishabh Jain**

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```bash
Replace `<placeholders>` with actual values specific to your project. This template provides sections for features, setup instructions, API endpoints, middleware, libraries used, contributors, and licensing information, tailored to your email marketing sequence application.

```

# Classroom

Classroom is a platform where Admins can create classrooms, teacher and student accounts. Admins, teachers and students have specific/constrained access, as students can only visit the classrooms they belong to.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#Contact)

## Features

- **Constrained Access**: Users are given specific access based on their roles.
- **Interactive UI**: Packed with amazing and simple UI/UX that enables the user to easily navigate and interact with the app.
- **User Authentication**: Secure user registration and login.

## Tech Stack

- **Frontend**: React.js, hosted on Vercel
- **Backend**: Node.js, Express.js, hosted on Render
- **Database**: MongoDB
- **Language**: JavaScript
- **Security**: JWT Authentication

## Getting Started

Follow these instructions to set up and run "Classroom" on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- MongoDB

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/D-pixel-crime/Classroom.git
   cd Classroom
   ```

2. **Install frontend dependencies:**

   ```sh
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**

   ```sh
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   CLASSROOM_FRONTEND_URI = http://localhost:5173
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

## Usage

1. **Frontend:**

   Run the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

2. **Backend:**

   Run the backend server:

   ```sh
   cd ../backend
   npm run dev
   ```

3. **Access the application:**

   Open your browser and navigate to `http://localhost:5173` for the frontend and `http://localhost:3000` for the backend API.

## Contact

Mail me - [dpk4383@gmail.com](mailto:dpk4383@gmail.com)

Project Link: [https://github.com/D-pixel-crime/Classroom](https://github.com/D-pixel-crime/Classroom)

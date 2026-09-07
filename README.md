
  

# 🌸 Flladé Clinic - MERN Stack Web App

This full-stack project was developed as the final certification project for a MERN Tech course. It showcases a modern, responsive clinic website built using the **MERN stack**.

  
  

## 🧩 Stack Used

  

- **Frontend**: React, CSS, React Bootstrap

- **Backend**: Node.js, Express.js

- **Database**: MongoDB

- **Tools & Libraries**: axios, cors, dotenv, express-session, express, mongoose, multer, nodemailer, nodemon

  
  

## ✨ Features

  

- User authentication with **Sign In, Sign Up, and Sign Out** functionality for both **Users** and **Admins**.

- Booking and Contact form with **email notifications** sent to admin upon submission.

- Admin panel to **manage products**: add, update, and delete product listings.

- Shopping experience with **Add to Cart** and **Shop Now** functionality.

- **Product filtering** by category or attributes for easier browsing.

- **Responsive design** built with React Bootstrap for a smooth UI on all devices.

- Environment-based configuration with Dotenv for **security** and **flexibility**.

  
  

## 📁 Project Structure

  

```

fllade-clinic/

├── frontend/

├── backend/

├── README.md

  

```

  
  

## ⚙️ Setup & Installation

  

Follow these steps to run the project locally.

  

  

### 1. Open the Project

  

You can either clone this repository or download it as a ZIP file:

  

#### Option 1: Clone via Git

  

```bash

git clone https://github.com/denada-bahja/fllade-clinic.git

cd fllade-clinic

```

  

#### Option 2: Download as ZIP (No Git Required)

  

Download the project as a **ZIP file** and extract/unzip the file to your code editor.

  

---

  

### 2. Install Dependencies

  

Open a split terminal _(or two terminals)_ to install dependencies for both backend and frontend.

  

#### For Backend

  

```bash

cd backend

npm install

```

  

#### For Frontend

  

```bash

cd frontend

yarn install

```

  

To install `node_modules` for both `frontend/` and `backend/`. 
*(You can use `npm install` instead of `yarn` if you prefer)*

  

---

  

### 3. Configure Environment Variables

  

#### For Backend

  

Create a `.env` file inside the `backend/` directory with the following content:

  

```

EMAIL_USER=your_email

EMAIL_PASS=your_email_nodemailer_pass

EMAIL_RECEIVER=your_email

MONGO_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:3000

BACKEND_PORT=5000

```

  

Replace `your_email` with your actual email.

Replace `your_email_nodemailer_pass` with your actual email password or app-specific password (e.g., for Gmail with 2FA).

  

Replace `your_mongodb_connection_string` with your MongoDB URI (local or Atlas).

  
  

#### For Frontend

  

Create a `.env` file inside the `frontend/` directory with the following content:

  

```

REACT_APP_BACKEND_URL=http://localhost:5000

```

---

  

### 4. Run the App

  

#### Start Backend

  

```bash

cd backend

npm start

```

The backend will run on `http://localhost:5000`

  

#### Start Frontend

  

Open a new terminal:

  

```bash

cd frontend

yarn start

```

  

The frontend will run on `http://localhost:3000`

  

---

  

### 5. Seed the Database (Optional)

  

To insert initial sample data (products, services, and predefined users like `admin` and `user`) into the database:

  

#### Step 1: Make sure the backend server is **not running**

  

If the backend is running, stop it first, then run:

  

```bash

cd backend

npm run seed

```

  

Make sure your `.env` file in the `backend/` folder has a valid `MONGO_URI` before running the seed command.



  

## 📌 Notes

  

- The project includes models and routes for services, products, bookings, contact, and users.

- This project was created as part of the **final project** for a MERN Tech course.
- 

# Sattva Flow Application

> Users can register and log in to the Sattva Flow application to join various yoga classes and participate in different batches.

## 🛠️ Backend Development

The backend is built using Node.js and Express.js.

### 🚀 Backend Deployment

The backend is hosted on [Render](https://sattvaflow.onrender.com).

## 🌐 Frontend Development

The frontend is developed using React.js.

### 🚀 Frontend Deployment

The frontend is deployed on [Vercel](https://sattva-flow.vercel.app/).

## 💾 Database 

The application uses MongoDB.

### Entity-Relationship (ER) Diagram and Table Schema

- **Assumptions for Smooth Operation:**
  - The token cannot be stored in cookies.
  - To ensure the application runs correctly:
    - Navigate to `backend/middlewares/tokenAuth.js` and uncomment the line containing the token.
    - Update the token value in local storage.
  - The payment API only updates the `paymentStatus` in the Batch table.
  - Age restrictions apply only when registering for new yoga classes.
  - Users below 18 and above 65 can also register for the application.
  - Error handling is not properly implemented on the frontend.
  
### What to note
- Any user can register or log in to the application.
- Users can enroll in yoga classes for the current month and future months.
- Users must pay fees before starting yoga classes for the current month.
- Users cannot register for different batches in the same month.

### 🛠️ Clone and Build Locally

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and add the following fields:
# PORT
# NODE_ENV
# MONGO_URI
# JWT_SECRET
# JWT_EXPIRE

# Run the development server
npm run dev

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

**Feel free to fork, star, or contribute to this project!**

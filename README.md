
# Koursely - Course Selling App

Koursely is a feature-rich course-selling application where users can browse, purchase, review, and complete courses. The app also allows users to manage their accounts, create wishlists, and watch course videos. Admins have full control over course management and user data.

## Live Demo
Check out the live demo here: [Koursely Live](https://course-selling-lime.vercel.app/)

## Repository
To get started, clone the repository:
```bash
git clone https://github.com/Yashvardhandhondge/Course-selling.git
```

## Features
### User Features
- Sign up and sign in (email notification via Nodemailer).
- Create, update, and delete their account.
- Browse courses, purchase courses, and view purchased courses.
- Add courses to a wishlist.
- Watch course videos.
- Review courses and mark them as completed.

### Admin Features
- Sign up and sign in (email notification via Nodemailer).
- Create, update, and delete courses.
- View and manage user and admin profiles.

## Tech Stack
- **Frontend**: React
- **Backend**: Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **API Integration**: (Optional) AI Chatbot API Key (e.g., Gemini)

## Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/Yashvardhandhondge/Course-selling.git
```

### Step 2: Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install the necessary dependencies:
```bash
npm install
```

### Step 3: Environment Variables
Set up the `.env` file in the `backend` directory with the following keys:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRETE_ADMIN=your_admin_jwt_secret
JWT_SECRETE_USER=your_user_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
API_KEY=your_ai_chatbot_api_key
```

### Step 4: Start the Backend Server
Run the backend server using one of the following commands:
```bash
nodemon index.js
# or
node index.js
```

### Step 5: Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install the dependencies:
```bash
npm install
```

Run the frontend server:
```bash
npm run dev
```

### Configuration
- Ensure the API routes are set to `http://localhost:3000` in your frontend.
- Change the CORS route to `http://localhost:5173` in your backend.

## Snapshots
![Live project screenshot](https://pbs.twimg.com/media/Gb1-s0EbUAAA9bm?format=jpg&name=medium)
![Live project screenshot](https://pbs.twimg.com/media/Gb1-s0EacAAnOvh?format=jpg&name=medium)
![Live project screenshot](https://pbs.twimg.com/media/Gb1-s0EbwAMYZB-?format=jpg&name=medium)


## Conclusion
Koursely is a robust platform for course sellers and learners, enabling seamless course management, purchase, and viewing experiences.

---

Enjoy using Koursely! If you encounter any issues, feel free to open an issue on GitHub.

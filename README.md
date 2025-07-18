# AssignmentHub - MERN Application

A complete full-stack MERN application designed for Kenyan high school teachers to share assignments with students during holidays. Features a light blue and purple theme with modern UI components.

## 🚀 Features

### For Teachers (Authenticated)
- Create classes with unique passcodes
- Post assignments with file uploads
- Schedule assignment visibility
- Add private teacher notes
- Generate printable slips with QR codes
- SMS notifications (optional)

### For Students (Anonymous Access)
- Enter passcode to access classes
- View assignments and deadlines
- Download attached files
- Countdown timers for deadlines
- Local bookmarking of classes
- QR code scanning support

## 🛠 Tech Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing
- **Twilio** - SMS notifications (optional)
- **QRCode** - QR code generation

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **React Query** - Data fetching
- **Tailwind CSS** - Styling
- **Headless UI** - Component library
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
assignment-hub/
├── server/                 # Backend (Node.js/Express)
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & upload middleware
│   ├── uploads/           # File uploads storage
│   └── server.js          # Server entry point
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── App.js         # Main app component
│   └── public/            # Static assets
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment-hub
   ```

2. **Install root dependencies first**
   ```bash
   npm install
   ```

3. **Install all project dependencies**
   ```bash
   npm run install-all
   ```

4. **Set up environment variables**
   
   Create `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/assignmenthub
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:3000
   
   # Optional: Twilio SMS Configuration
   # TWILIO_ACCOUNT_SID=your_twilio_account_sid
   # TWILIO_AUTH_TOKEN=your_twilio_auth_token
   # TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

   Create `client/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 3000) concurrently.

## 📱 Usage

### For Teachers
1. Register at `/register`
2. Create classes with unique passcodes
3. Post assignments with files and deadlines
4. Share passcodes with students
5. Generate printable slips

### For Students
1. Visit `/classes` to browse public classes
2. Enter passcode to access specific class
3. View assignments and download files
4. Bookmark classes for quick access

## 🔧 SMS Configuration (Optional)

To enable SMS notifications:

1. Sign up for a Twilio account at https://www.twilio.com
2. Get your Account SID, Auth Token, and phone number
3. Uncomment and fill in the Twilio variables in `server/.env`:
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=+1234567890
   ```

If Twilio is not configured, the SMS feature will be disabled but the rest of the application will work normally.

## 🎨 Color Scheme

The application uses a light blue and purple color palette:

- **Primary**: Light blue (#0ea5e9 to #0c4a6e)
- **Secondary**: Purple (#a855f7 to #581c87)
- **Accent**: Green (#10b981 to #064e3b)
- **Warning**: Orange (#f59e0b to #78350f)
- **Danger**: Red (#ef4444 to #7f1d1d)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Teacher registration
- `POST /api/auth/login` - Teacher login
- `GET /api/auth/me` - Get current user

### Classes (Protected)
- `GET /api/classes` - Get teacher's classes
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Assignments (Protected)
- `GET /api/assignments` - Get teacher's assignments
- `POST /api/assignments` - Create new assignment
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment

### Student Access (Public)
- `GET /api/student/class/:passcode` - Get class by passcode
- `GET /api/student/classes/public` - Get all public classes

### Utilities
- `GET /api/print/slip/:classId` - Generate print slip
- `POST /api/notify/sms` - Send SMS notifications (if configured)

## 🔐 Security Features

- JWT authentication for teachers
- Password hashing with bcrypt
- File upload validation
- Input sanitization
- CORS configuration
- Rate limiting (recommended for production)

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface
- QR code scanning support
- Offline-friendly architecture

## 🚀 Deployment

### Backend (Railway/Render)
1. Create account on Railway or Render
2. Connect your repository
3. Set environment variables
4. Deploy the `server` folder

### Frontend (Vercel/Netlify)
1. Create account on Vercel or Netlify
2. Connect your repository
3. Set build directory to `client`
4. Set environment variables
5. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the issues section
- Contact the development team
- Review the documentation

## 🔮 Future Enhancements

- Push notifications
- Assignment submission portal
- Grade tracking
- Parent portal
- Mobile app
- Offline support
- Multi-language support

---

Built with ❤️ for Kenyan education system
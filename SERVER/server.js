const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.COOKIE_AGE)
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes') ;
const commentRoutes = require('./routes/commentRoute');
const insuranceRoutes = require('./routes/insuranceRoutes');
const paymentRoutes = require('./routes/paymentsRoutes');
app.use('/api/users', userRoutes);
app.use('/api/vehicle' , vehicleRoutes ) ;
app.use('/api/comments', commentRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/payment' , paymentRoutes)  ;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

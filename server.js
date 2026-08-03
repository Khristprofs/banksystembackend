const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const bankRoute = require('./routes/bankRoute');
const branchRoute = require('./routes/branchRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const accountRoute = require('./routes/accountRoute');
const jointAccountRoute = require('./routes/jointAccountRoute')
const cardRoute = require('./routes/cardRoute')
const transactionRoute = require('./routes/transactionRoute')
const notificationRoute = require('./routes/notificationRoute')
const refreshTokenRoute = require('./routes/refreshTokenRoute')
const authRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");

dotenv.config();

connectDB();

const app = express();

// Middleware

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
  })
);

//use app Routes
app.use("/api/v1/banks", bankRoute);
app.use("/api/v1/branches", branchRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/accounts", accountRoute);
app.use("/api/v1/jointAccounts", jointAccountRoute);
app.use("/api/v1/cards", cardRoute);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/refreshtoken", refreshTokenRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.get("/", (req, res) => {
    res.send("Server running")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App running on PORT: ${process.env.NODE_ENV} mode on port ${PORT}`)
})
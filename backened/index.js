require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); 
const authRoute = require("./Routes/AuthRoute"); // ensure correct case
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionModel } = require("./model/PositionModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoute);  
app.get('/allHoldings', async (req,res)=>{
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get('/allPositions', async (req,res)=>{
  const allPositions = await PositionModel.find({});
  res.json(allPositions);
});

app.post('/newOrder', async(req,res)=>{
  let newOrder = new OrdersModel(req.body);
  await newOrder.save();
  res.send("Order saved");
});

app.get('/allOrders', async(req,res)=>{
  const allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

// Connect to MongoDB first, then start server
mongoose.connect(URL)
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./models/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const jewelleryRoute = require("./routes/jewelleryRoute");
const userRoute = require("./routes/userRoute");
const CartRoute = require("./routes/cartRoute");

const app = express();
connectDB();

// Allow credentials and frontend origin
app.use(cors({
    origin: true,
    methods:[ "GET","POST","PUT","DELETE"], 
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

app.use("/jewellery", jewelleryRoute);
app.use("/user", userRoute);
app.use("/cart", CartRoute);


app.get("/", (req, res) => {
    res.send("<h2>Welcome to Jewellery Shop</h2>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

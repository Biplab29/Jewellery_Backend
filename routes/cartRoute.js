const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.post("/addItem/:uid/:jids", cartController.addItemsToCart);
cartRouter.get("/viewcart/:uid", cartController.viewCartItems); 

module.exports = cartRouter;
console.log("Cart Route is Working...");

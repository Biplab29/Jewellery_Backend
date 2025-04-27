const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");
const jewelleryModel = require("../models/jewelleryModel");


const addItemsToCart = asyncHandler(async (req, res) => {
  try {
    const jewelleryIds = req.params.jids.split(",");


    for (const id of jewelleryIds) {
      const exists = await jewelleryModel.findOne({ j_id: id.trim() }); // use trim to clean up spaces
      if (!exists) {
        return res.status(400).json({ error: `Jewellery ID '${id}' does not exist` });
      }
    }

    const cartbj = await cartModel.create({
      cart_id: "Item-" + Math.floor(Math.random() * 99999),
      user_id: req.params.uid,
      jewellery_ids: req.params.jids,
      jewellery_qty: req.body.qty,
      totalPrice: req.body.price,
    });

    return res.status(201).json({
      message: "Items added to the cart successfully",
      items: cartbj,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


const userDetails = async (uid) => {
  const userObj = await userModel.findById(uid);
  if (!userObj) throw new Error("User not found");

  return {
    name: userObj.name,
    email: userObj.email,
  };
};


const getJewelleryItems = async (jid, qty) => {
  console.log("Looking for j_id:", jid);
  const jewelleryObj = await jewelleryModel.findOne({ j_id: jid });

  if (!jewelleryObj) {
    throw new Error(`Jewellery Not Found for j_id: ${jid}`);
  }

  return {
    name: jewelleryObj.name,
    type: jewelleryObj.type,
    material: jewelleryObj.material,
    price: jewelleryObj.price,
    qty,
    totalPrice: Number(jewelleryObj.price) * Number(qty),
  };
};


const viewCartItems = asyncHandler(async (req, res) => {
  try {
    const cartObj = await cartModel.findOne({ user_id: req.params.uid });
    if (!cartObj) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const jewelleryIds = (cartObj.jewellery_ids || "").split(",");
    const jewelleryQty = (cartObj.jewellery_qty || "").split(",");

    const jewelleryList = [];
    let totalPayAmount = 0;

    for (let i = 0; i < jewelleryIds.length; i++) {
      const jid = jewelleryIds[i].trim();
      const qty = Number(jewelleryQty[i] || 0);

      const jewelleryObj = await getJewelleryItems(jid, qty);
      totalPayAmount += jewelleryObj.totalPrice;
      jewelleryList.push(jewelleryObj);
    }

    const userObj = await userDetails(req.params.uid);

    res.status(200).json({
      user: userObj,
      items: jewelleryList,
      net_Amount: totalPayAmount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addItemsToCart,
  viewCartItems,
};

console.log("Cart controller is working");

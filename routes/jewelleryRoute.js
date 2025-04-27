const express = require('express');
const multer = require("multer");
const jewelleryController = require("../controllers/jewelleryController");
const checkLogin = require("../middleware/loginAuth");

const jewelleryRouter = express.Router();

const uploadStorage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + Math.floor(Math.random() * 99999) + "-" + file.originalname);
    }
});
const upload = multer({ storage: uploadStorage });

console.log("Multer is Working...");

jewelleryRouter.get("/all", jewelleryController.getAllJewellery);
jewelleryRouter.post("/add", upload.single('jimage'), jewelleryController.addJewellery);
jewelleryRouter.put("/update/:jid", upload.single('jimage'), jewelleryController.updateJewellery); // ✅ FIXED
jewelleryRouter.delete("/delete/:jid", jewelleryController.deleteJewellery);

module.exports = jewelleryRouter;
console.log("Jewellery Router is Working");

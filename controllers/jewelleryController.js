const express = require("express");
const asyncHandler = require("express-async-handler");
const jewelleryModel = require("../models/jewelleryModel");
const baseUrl = require("../models/baseUrl");

// GET all jewellery
const getAllJewellery = asyncHandler(async (req, res) => {
    const jewellery = await jewelleryModel.find();
    if (!jewellery || jewellery.length === 0) {
        res.status(404).json({ message: "No jewellery found" });
    } else {
        res.status(200).json(jewellery);
    }
});

// ADD jewellery
const addJewellery = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const jewellery = await jewelleryModel.create({
            j_id: "Jewellery_id-" + Math.floor(Math.random() * 99999),
            name: req.body.jname,
            type: req.body.jtype,
            material: req.body.jmaterial,
            weight: req.body.jweight,
            price: req.body.jprice,
            image: baseUrl + "/uploads/" + req.file.filename
        });

        res.status(200).json({
            message: "Jewellery Add Successful",
            jewellery
        });

    } catch (error) {
        res.status(500).json({ message: "Jewellery Add Error", error: error.message });
    }
});


// UPDATE jewellery
const updateJewellery = asyncHandler(async (req, res) => {
    try {
        const jewellery = await jewelleryModel.updateOne(
            { j_id: req.params.jid },
            {
                $set: {
                    name: req.body.jname,
                    type: req.body.jtype,
                    material: req.body.jmaterial,
                    weight: req.body.jweight,
                    price: req.body.jprice
                }
            }
        );

        if (jewellery.modifiedCount === 0) {
            return res.status(403).json({ message: "Jewellery Update Error" });
        }

        res.status(200).json({ message: "Jewellery Update Successful" });

    } catch (error) {
        res.status(500).json({ message: "Update Failed", error: error.message });
    }
});


// DELETE jewellery
const deleteJewellery = asyncHandler(async (req, res) => {
    try {
        const jewellery = await jewelleryModel.deleteOne({ j_id: req.params.jid });
        if (jewellery.deletedCount === 0) {
            return res.status(403).json({ message: "Jewellery Delete Error" });
        }

        res.status(200).json({ message: "Jewellery Delete Successful" });

    } catch (error) {
        res.status(500).json({ message: "Delete Failed", error: error.message });
    }
});

module.exports = {
    getAllJewellery,
    addJewellery,
    updateJewellery,
    deleteJewellery
};

console.log("Jewellery Controller is Working...");

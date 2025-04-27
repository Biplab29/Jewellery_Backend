const mongoose = require('mongoose');
const Jewellery = require('../models/jewelleryModel'); // Adjust the path accordingly

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/jewelleryshop')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

// Sample data to insert
const jewelleryData = [
    { j_id: 'J001', name: 'Gold Ring', type: 'Ring', material: 'Gold', weight: 10, price: 1500, image: 'image_url_1' },
    { j_id: 'J002', name: 'Silver Necklace', type: 'Necklace', material: 'Silver', weight: 20, price: 1200, image: 'image_url_2' },
    { j_id: 'J003', name: 'Platinum Bracelet', type: 'Bracelet', material: 'Platinum', weight: 15, price: 2500, image: 'image_url_3' },
    { j_id: 'J004', name: 'Gold Necklace', type: 'Necklace', material: 'Gold', weight: 18, price: 1800, image: 'image_url_4' },
    { j_id: 'J005', name: 'Silver Ring', type: 'Ring', material: 'Silver', weight: 12, price: 1100, image: 'image_url_5' },
    { j_id: 'J006', name: 'Platinum Necklace', type: 'Necklace', material: 'Platinum', weight: 22, price: 3000, image: 'image_url_6' },
    { j_id: 'J007', name: 'Gold Bracelet', type: 'Bracelet', material: 'Gold', weight: 14, price: 2000, image: 'image_url_7' },
    { j_id: 'J008', name: 'Silver Pendant', type: 'Pendant', material: 'Silver', weight: 8, price: 900, image: 'image_url_8' },
    { j_id: 'J009', name: 'Gold Earrings', type: 'Earrings', material: 'Gold', weight: 5, price: 1000, image: 'image_url_9' },
    { j_id: 'J010', name: 'Platinum Ring', type: 'Ring', material: 'Platinum', weight: 10, price: 2200, image: 'image_url_10' },
    { j_id: 'J011', name: 'Silver Bracelet', type: 'Bracelet', material: 'Silver', weight: 13, price: 1300, image: 'image_url_11' },
    { j_id: 'J012', name: 'Gold Pendant', type: 'Pendant', material: 'Gold', weight: 7, price: 950, image: 'image_url_12' },
    { j_id: 'J013', name: 'Platinum Earrings', type: 'Earrings', material: 'Platinum', weight: 6, price: 2100, image: 'image_url_13' },
    { j_id: 'J014', name: 'Silver Necklace', type: 'Necklace', material: 'Silver', weight: 20, price: 1150, image: 'image_url_14' },
    { j_id: 'J015', name: 'Gold Bracelet', type: 'Bracelet', material: 'Gold', weight: 16, price: 1900, image: 'image_url_15' },
    { j_id: 'J016', name: 'Platinum Pendant', type: 'Pendant', material: 'Platinum', weight: 9, price: 2400, image: 'image_url_16' },
    { j_id: 'J017', name: 'Silver Earrings', type: 'Earrings', material: 'Silver', weight: 4, price: 850, image: 'image_url_17' },
    { j_id: 'J018', name: 'Gold Ring', type: 'Ring', material: 'Gold', weight: 11, price: 1400, image: 'image_url_18' },
    { j_id: 'J019', name: 'Platinum Necklace', type: 'Necklace', material: 'Platinum', weight: 24, price: 3200, image: 'image_url_19' },
    { j_id: 'J020', name: 'Silver Bracelet', type: 'Bracelet', material: 'Silver', weight: 14, price: 1250, image: 'image_url_20' }
];

// Insert data into the collection
Jewellery.insertMany(jewelleryData)
    .then((docs) => {
        console.log('Inserted jewellery data:', docs);
        mongoose.disconnect(); // Close the connection after the insertion
    })
    .catch(err => {
        console.log('Error inserting data:', err);
        mongoose.disconnect(); // Close the connection in case of error
    });

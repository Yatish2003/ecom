const express = require('express');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data.json');
const data = require(dataPath);

const routes = express.Router();

// GET all products
routes.get('/', (req, res) => {
    res.json(data.product);
});


// GET a single product by ID
routes.get('/:id', (req, res) => {
    const id = req.params.id; 
    const product = data.product.find(p => p.id == id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// PUT (update) a product by ID
routes.put('/:id', (req, res) => {
    const id = req.params.id; 
    console.log(id,"Put-id")
    const updatedProduct = req.body;

    // Find the product by ID
    const productIndex = data.product.findIndex(p => p.id == id);
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product
    data.product[productIndex] = { ...data.product[productIndex], ...updatedProduct };

    // Write the updated data to the file
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to update product', error: err });
        }
        res.json({ message: 'Product updated successfully', updatedProduct: data.product[productIndex] });
    });
});

// POST (create) a new product
routes.post('/', (req, res) => {
    const newProduct = req.body;

    // Validate required fields
    if (!newProduct.img || !newProduct.product_name || !newProduct.category || !newProduct.description || !newProduct.price || !newProduct.img1 || !newProduct.img2 || !newProduct.img3) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Add new product with an ID
    const newProductWithId = {
        ...newProduct,
        id: data.product.length + 1,
        cart: false,
        wishlist: false,
    };

    // Push new product to the products array
    data.product.push(newProductWithId);

    // Write the updated data to the file
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to add product', error: err });
        }
        res.json({ message: 'Product added successfully', newProduct: newProductWithId });
    });
});







module.exports = routes;

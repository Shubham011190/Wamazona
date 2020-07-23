const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/wamazona-db", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const productSchema = new mongoose.Schema({
    _id: { type: String , default:shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
});

const Product = mongoose.model("products", productSchema);

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async(req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port ${port}` );
})
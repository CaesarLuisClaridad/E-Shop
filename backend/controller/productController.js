import Product from "../model/product.js";

// create product => api/v1/product
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        product
    })
}

// get Product => api/v1/product
export const getProducts = async (req, res) => {
    const product = await Product.find();

    res.status(200).json({
        product
    })
}

// get specific product => api/v1/product/:id
export const getProductDetails = async (req, res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product){
        res.status(404).json({
            err: "Product not found"
        })
    }

    res.status(200).json({
        product,
    })
}

// update product = api/v1/admin/product/:id
export const updateProduct = async (req, res) => {
    let product = await Product.findById(req?.params?.id);

    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true});

    res.status(200).json({
        product,
    })
}

// delete product = api/v1/product/:id
export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req?.params?.id)

    if(!product){
        res.status(404).json({
            error: "Product not found"
        })
    }

    await product.deteleOne();

    res.status(200).json({
        message: "Product deleted"
    })
}


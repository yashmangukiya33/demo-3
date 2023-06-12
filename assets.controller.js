const Asset = require('../model/assets');
const asyncHandler = require('express-async-handler');
const Joi = require("joi")


const validationSchema = Joi.object({
    product: Joi.string().required(),
    category_id: Joi.required(),
    assingto_id: Joi.required(),
    status: Joi.string().valid("assign", "associated", "unavailable", "available"),
    expirationDate: Joi.date().required()
        .min(Joi.ref('$now')).raw()
        .error(() => 'Product has assetexpirationDate and is unavailable'),
    condition:Joi.string().required()
});

   

// Create a new asset
const createAsset = asyncHandler(async (req, res) => {

    const { product, category_id, assingto_id, status, expirationDate, condition } = req.body;
    
    // Create a new Asset
    const asset = new Asset({ product, category_id, assingto_id, status, expirationDate, condition });
    
    let assetStatus = status;
    Asset.status = assetStatus;

    // Check if the status is initially set to "assign" and the expirationDate is passed
    if (assetStatus === 'assign') {
        asset.status = 'associated';
    }
    if (assetStatus === 'associated' && expirationDate && new Date(expirationDate) < new Date()) {
        asset.status = 'unavailable';
        // console.log(assetStatus)
    }
    if (assetStatus === 'assign' && expirationDate && new Date(expirationDate) < new Date()) {
        asset.status = 'unavailable';
        console.log(assetStatus)
        console.log("expired")
    }

   
    await asset.save();

    res.status(201).json(asset);
});

// Get all assets
const getAllAssets = asyncHandler(async (req, res) => {
    const assets = await Asset.find();

    if (!assets) {
        res.status(404).json({ message: 'No Assets found' });
    } else {
        res.json(assets);
    }
});

// Get Asset by ID
const getAssetById = asyncHandler(async (req, res) => {
    const assetId = req.params.id;
    const asset = await Asset.findById(assetId);

    if (!asset) {
        res.status(404).json({ message: 'Asset not found' });
    } else {
        res.json(asset);
    }
});

// Update Asset by ID
const updateAssetById = asyncHandler(async (req, res) => {
    const assetId = req.params.id;
    const { product, category_id, assingto_id, status, expirationDate, condition } = req.body;

    const asset = await Asset.findByIdAndUpdate(assetId, { product, category_id, assingto_id, status, expirationDate, condition }, { new: true });
    let assetStatus = status;
    Asset.status = assetStatus;

    // Check if the status is initially set to "assign" and the expirationDate is passed
    if (assetStatus === 'assign') {
        asset.status = 'associated';
    }
    if (assetStatus === 'associated' && expirationDate && new Date(expirationDate) < new Date()) {
        asset.status = 'unavailable';
        // console.log(assetStatus)
    }
    if (assetStatus === 'assign' && expirationDate && new Date(expirationDate) < new Date()) {
        asset.status = 'unavailable';
        console.log(assetStatus)
        console.log("expired")
    }
    if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
    }

    res.json(asset);
});

// Delete Asset by ID
const deleteAssetById = asyncHandler(async (req, res) => {
    const assetId = req.params.id;

    const asset = await Asset.findByIdAndDelete(assetId);

    if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
    }
    console.log(asset)
    res.json({ message: 'Asset deleted successfully' });
});

// Get all assets with populated category
const getAllAssetsbyPopulate = asyncHandler(async (req, res) => {
    const asset = await Asset.find().populate('_id')

    if (!asset) {
        return res.status(404).json({ message: 'No users found' });
    }

    res.json(asset);
});
module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAssetById,
    deleteAssetById,
    getAllAssetsbyPopulate
}
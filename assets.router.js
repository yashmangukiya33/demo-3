const express = require('express');
const router = express.Router();
const AssetController = require('../controller/assets');

router.post('/addasset',AssetController.createAsset);
router.get('/', AssetController.getAllAssets);
router.get('/:id',AssetController.getAssetById );
router.put('/:id',AssetController.updateAssetById );
router.delete('/:id',AssetController.deleteAssetById );
router.get('/populate',AssetController.getAllAssetsbyPopulate );


module.exports = router;

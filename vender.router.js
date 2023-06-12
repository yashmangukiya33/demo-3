const express = require('express');
const router = express.Router();
const VenderController = require('../controller/vender');

router.post('/addvender', VenderController.createVender);
router.get('/', VenderController.getAllVender);
router.get('/:id', VenderController.getVenderById);
router.put('/:id', VenderController.updateVenderById);
router.delete('/:id',VenderController.deleteVenderById);


module.exports = router;

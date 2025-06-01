const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');

router.get('/', resourcesController.getAllResources);
router.post('/', resourcesController.createResource);
router.get('/:id', resourcesController.getResourceById);
router.put('/:id', resourcesController.updateResource);
router.patch('/:id', resourcesController.patchResource);
router.delete('/:id', resourcesController.deleteResource);

module.exports = router;
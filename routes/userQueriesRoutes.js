const express = require('express');
const router = express.Router();
const userQueriesController = require('../controllers/userQueriesController');

router.get('/', userQueriesController.getAllUserQueries);
router.post('/', userQueriesController.createUserQuery);
router.get('/:id', userQueriesController.getUserQueryById);
router.put('/:id', userQueriesController.updateUserQuery);
router.patch('/:id', userQueriesController.patchUserQuery);
router.delete('/:id', userQueriesController.deleteUserQuery);

module.exports = router;
const express = require('express');
const ctrl = require('../controllers/userController');
const { userValidationRules, validate } = require('../middleware/validators');

const router = express.Router();

// IMPORTANT: /export must come before /:id so it's not treated as an id
router.get('/export', ctrl.exportUsersCSV);

router.get('/', ctrl.listUsers);
router.get('/:id', ctrl.getUser);
router.post('/', userValidationRules, validate, ctrl.createUser);
router.put('/:id', userValidationRules, validate, ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');
const {
    getAllUser,
    getSingleUser,
    updateUser,
    updatePassword,
    showCurrentUser
} = require('../controllers/User');


router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUser);
router.route('/showMe').get(authenticateUser,showCurrentUser);
router.route('/:id').get(authenticateUser ,getSingleUser);
router.route('/updateUser').patch(authenticateUser,updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updatePassword);

module.exports = router;

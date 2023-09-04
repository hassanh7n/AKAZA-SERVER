const express = require('express');
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');


const {
    createProduct,
    getAllProducts,
    singleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/Product');


router.route('/').get([authenticateUser, authorizePermissions('admin')], getAllProducts);
router.route('/').post([authenticateUser, authorizePermissions('admin')], createProduct);
router.route('/uploadImage', ([authenticateUser, authorizePermissions('admin')], uploadImage));
router.route('/:id').get([authenticateUser, authorizePermissions('admin')], singleProduct);
router.route('/:id').post([authenticateUser, authorizePermissions('admin')], updateProduct);
router.route('/:id').delete([authenticateUser, authorizePermissions('admin')], deleteProduct);





module.exports = router;
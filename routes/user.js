const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validations');

const {
  getUsers,
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateUpdateUser, updateUserProfile);

module.exports = router;

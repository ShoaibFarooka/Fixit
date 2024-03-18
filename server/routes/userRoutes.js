const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", controller.Register);
router.post("/login", controller.Login);
router.put(
  "/update-user-info",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  controller.UpdateUser
);
router.get('/get-user-role',
    authMiddleware.stripToken,
    authMiddleware.verifyToken,
    controller.GetUserRole
)
router.get('/providers', controller.GetProviders)

module.exports = router;

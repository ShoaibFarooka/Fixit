const router = require("express").Router();
const controller = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create',
    authMiddleware.stripToken,
    authMiddleware.verifyToken,
    controller.CreateRequest
)
router.get('/providers',
    authMiddleware.stripToken,
    authMiddleware.verifyToken,
    controller.ProviderRequests
)
router.put('/:request', controller.UpdateRequest)

module.exports = router

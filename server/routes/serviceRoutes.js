const router = require("express").Router();
const controller = require("../controllers/serviceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create',
    authMiddleware.stripToken,
    authMiddleware.verifyToken,
    controller.CreateService)
router.get('/all', controller.GetServices)
router.get('/providers',
    authMiddleware.stripToken,
    authMiddleware.verifyToken,
    controller.GetProvidersServices
)
router.get('/:user', controller.GetServicesByProvider)

module.exports = router

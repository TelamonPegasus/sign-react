const express = require("express");
const router = express.Router();
const subscribersController = require("../controllers/subscribersController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");

router.route("/").get(subscribersController.getAllSubscribers);

router
  .route("/:id")
  .get(subscribersController.getOneSubscriber)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    subscribersController.updateSubscriber
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    subscribersController.deleteOneSubscriber
  );

module.exports = router;

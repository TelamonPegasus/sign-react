const express = require("express");
const router = express.Router();
const subscribersController = require("../controllers/subscribersController");

router.route("/").get(subscribersController.getAllSubscribers);

router
  .route("/:id")
  .get(subscribersController.getOneSubscriber)
  .put(subscribersController.updateSubscriber)
  .delete(subscribersController.deleteOneSubscriber);

module.exports = router;

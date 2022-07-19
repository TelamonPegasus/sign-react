const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin), employeesController.createNewEmployee);

router
  .route("/:id")
  .get(employeesController.getOneEmployee)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteOneEmployee);

module.exports = router;

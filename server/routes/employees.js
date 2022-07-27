const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/")
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin),
    employeesController.createNewEmployee
  );

router
  .route("/:id")
  .get(verifyJWT, employeesController.getOneEmployee)
  .put(
    verifyJWT,
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    employeesController.updateEmployee
  )
  .delete(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin),
    employeesController.deleteOneEmployee
  );

module.exports = router;

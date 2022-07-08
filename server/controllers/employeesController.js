const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  try {
    const response = await Employee.find();

    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: "server error" });
  }
};

const getOneEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Employee.findById(id);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOneEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Employee.findByIdAndDelete(id);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createNewEmployee = async (req, res) => {
  const { name, surname } = req.body;

  if (!name || !surname) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await Employee.create({
      name,
      surname,
    });

    res.status(201).send({ message: "New employee has been added" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;

  const updatedData = {
    name: req.body.name,
    surname: req.body.surname,
  };

  try {
    const response = await Employee.findByIdAndUpdate(id, updatedData);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllEmployees,
  getOneEmployee,
  createNewEmployee,
  updateEmployee,
  deleteOneEmployee,
};

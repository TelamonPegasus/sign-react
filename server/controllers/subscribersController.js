const Subscriber = require("../model/Subscriber");

const getAllSubscribers = async (req, res) => {
  try {
    const response = await Subscriber.find();

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOneSubscriber = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Subscriber.findById(id);

    res.status(200).send(response);
  } catch (error) {
    res.send(error);
  }
};

const updateSubscriber = async (req, res) => {
  const id = req.params.id;

  const Admin = { Admin: 5150 };
  const Editor = { Editor: 1984 };
  const User = { User: 2001 };

  const role = req.body?.updatedRole;

  function findRole() {
    if (role === "5150") {
      return Admin;
    } else if (role === "1984") {
      return Editor;
    } else {
      return User;
    }
  }

  const updatedData = {
    roles: findRole(),
  };

  try {
    const response = await Subscriber.findByIdAndUpdate(id, updatedData);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOneSubscriber = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Subscriber.findByIdAndDelete(id);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSubscribers,
  getOneSubscriber,
  updateSubscriber,
  deleteOneSubscriber,
};

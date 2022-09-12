const db = require("../models/index");
const Prayer = db.prayer;

//* Passed

exports.getPrayers = async (req, res) => {
  try {
    const prayers = await Prayer.find().populate("commitedToPray"); // Used to find all prayers within the database

    if(prayers.length > 0){
      return res.status(200).send({
              status: "Success",
              message: "Successfully retrieved prayers",
              results: prayers.length,
              data: {
                prayers: prayers,
              }
    });
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully retrieved prayers , No prayers present",
      results: prayers.length,
      data: {
        prayers: prayers
      }
    });

  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.getPrayer = async (req, res) => {
  try {
    const prayer = await Prayer.findById(req.params.id).populate(
      "commitedToPray"
    );
    if (prayer) {
      return res.status(200).send({
        status:'Success',
        message:'Successfully retrieved prayer',
        data:{
          prayer:prayer
        }
      });
    }
    res.status(404).send({
       status:"Not Found",
       message: "Prayer request not found"
      });

  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.createPrayer = async (req, res) => {
  try {
    const newPrayer = await Prayer.create({
      userId: req.body.userId,
      title: req.body.title,
      name: req.body.name,
      prayerRequest: req.body.prayerRequest,
      date: req.body.date,
      status: false,
    });
    res.status(201).send({
      status:'Success',
      message:'Successfully created prayer',
      data:{
        prayer:newPrayer
      }
    });
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.editPrayer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      title,
      name,
      prayerRequest,
      date,
      commitedToPray,
      status,
      updates,
    } = req.body;


    const updateDetails = {
      title: title,
      name: name,
      prayerRequest: prayerRequest,
      date: date,
      commitedToPray: commitedToPray,
      status: false,
      updates: updates,
    };

    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      updateDetails
    ).populate("commitedToPray");


    res.status(200).send({
      status: "Success",
      message: "Successfully updated prayer",
      data: {
        oldPrayer: updatedPrayer,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

exports.deletePrayer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrayer = await Prayer.findByIdAndRemove(id);

    if(!deletedPrayer){
      return res.status(404).send({
        status: "Not Found",
        message: "Prayer not found, cannot be deleted",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully deleted prayer",
      data: {
        prayer: deletedPrayer,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

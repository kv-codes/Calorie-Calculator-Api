const express = require("express");
const router = express.Router();

let averages = require("../models/bmiModel");

router.get("/list", async (req, res) => {
    const bmiData = await averages.getAll();   
  try {
    res.json({
      data: bmiData

    }); 
  } catch (err) {

    console.log(err);



  }
});





module.exports = router;
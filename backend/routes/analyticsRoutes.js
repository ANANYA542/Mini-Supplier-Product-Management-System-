const express = require("express");
const router = express.Router();
const { getSummary } = require("../controller/analyticsController");

router.get("/summary", getSummary);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  redirect,
} = require("../controllers/controller");

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortid", handleGetAnalytics);
router.get("/:shortid", redirect);

module.exports = router;

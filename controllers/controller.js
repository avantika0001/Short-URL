const URL = require("../models/model");
//we will use a service : https://www.npmjs.com/package/nanoid
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = shortid();
  //now inserting into the database
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
  //return res.json({ id: shortID });
}

async function redirect(req, res) {
  const shortid = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortid },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortid = req.params.shortid;
  const result = await URL.findOne({ shortId: shortid });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics, redirect };

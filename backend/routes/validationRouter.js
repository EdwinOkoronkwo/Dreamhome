// const express = require("express");
// const router = express.Router();
// const {
//   validateText,
//   validatePostcode,
//   validateDate,
//   validateImage,
// } = require("../util/validation");

// router.post("/validate-text", async (req, res) => {
//   const { text } = req.body;
//   try {
//     const isValid = await validateText(text);
//     res.json({ isValid });
//   } catch (error) {
//     res.status(500).json({ error: "Validation failed" });
//   }
// });

// router.post("/validate-postcode", async (req, res) => {
//   const { postcode } = req.body;
//   try {
//     const isValid = await validatePostcode(postcode);
//     res.json({ isValid });
//   } catch (error) {
//     res.status(500).json({ error: "Validation failed" });
//   }
// });

// router.post("/validate-date", async (req, res) => {
//   const { date } = req.body;
//   try {
//     const isValid = await validateDate(date);
//     res.json({ isValid });
//   } catch (error) {
//     res.status(500).json({ error: "Validation failed" });
//   }
// });

// router.post("/validate-image", async (req, res) => {
//   const { url } = req.body;
//   try {
//     const isValid = await validateImage(url);
//     res.json({ isValid });
//   } catch (error) {
//     res.status(500).json({ error: "Validation failed" });
//   }
// });

// module.exports = router;

//////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const {
  isValidText,
  isValidPostcode,
  isValidDate,
  isValidImage,
} = require("../util/validation");

router.post("/validate-text", (req, res) => {
  const { text } = req.body;
  const isValid = isValidText(text);
  res.json({ isValid });
});

router.post("/validate-postcode", (req, res) => {
  const { postcode } = req.body;
  const isValid = isValidPostcode(postcode);
  res.json({ isValid });
});

router.post("/validate-date", (req, res) => {
  const { date } = req.body;
  const isValid = isValidDate(date);
  res.json({ isValid });
});

router.post("/validate-image", (req, res) => {
  const { url } = req.body;
  const isValid = isValidImage(url);
  res.json({ isValid });
});

module.exports = router;

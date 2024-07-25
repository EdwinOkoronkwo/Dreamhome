// const { body } = require("express-validator");
// const {
//   isValidText,
//   isValidPostcode,
//   isValidImage,
// } = require("../util/validation");

// const validateBranchData = [
//   body("branchno")
//     .optional()
//     .custom((value) => {
//       const branchno = Array.isArray(value) ? value[0] : value;
//       return typeof branchno === "string" || "Branch number must be a string.";
//     }),

//   body("street")
//     .optional()
//     .custom((value) => {
//       const street = Array.isArray(value) ? value[0] : value;
//       return isValidText(street) || "Invalid street.";
//     }),

//   body("city")
//     .optional()
//     .custom((value) => {
//       const city = Array.isArray(value) ? value[0] : value;
//       return isValidText(city) || "Invalid city.";
//     }),

//   body("postcode")
//     .optional()
//     .custom((value) => {
//       const postcode = Array.isArray(value) ? value[0] : value;
//       return isValidPostcode(postcode) || "Invalid postcode.";
//     }),

//   body("image")
//     .optional()
//     .custom((value) => {
//       const image = Array.isArray(value) ? value[0] : value;
//       return isValidImage(image) || "Invalid image URL.";
//     }),
// ];

// module.exports = {
//   validateBranchData,
// };
////////////////////////////////////////////////////////////////

const { body } = require("express-validator");
const Validator = require("../util/validation"); // Ensure the path is correct

const validateBranchData = [
  body("branchno")
    .optional()
    .custom(async (value) => {
      const branchno = Array.isArray(value) ? value[0] : value;
      return (
        typeof branchno === "string" ||
        Promise.reject("Branch number must be a string.")
      );
    }),

  body("street")
    .optional()
    .custom(async (value) => {
      const street = Array.isArray(value) ? value[0] : value;
      const isValid = await Validator.validateText(street);
      return isValid || Promise.reject("Invalid street.");
    }),

  body("city")
    .optional()
    .custom(async (value) => {
      const city = Array.isArray(value) ? value[0] : value;
      const isValid = await Validator.validateText(city);
      return isValid || Promise.reject("Invalid city.");
    }),

  body("postcode")
    .optional()
    .custom(async (value) => {
      const postcode = Array.isArray(value) ? value[0] : value;
      const isValid = await Validator.validatePostcode(postcode);
      return isValid || Promise.reject("Invalid postcode.");
    }),

  body("image")
    .optional()
    .custom(async (value) => {
      const image = Array.isArray(value) ? value[0] : value;
      const isValid = await Validator.validateImage(image);
      return isValid || Promise.reject("Invalid image URL.");
    }),
];

module.exports = {
  validateBranchData,
};

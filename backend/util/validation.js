// function isValidText(text) {
//   return typeof text === "string" && text.trim().length > 0;
// }

// function isValidPostcode(postcode) {
//   // A basic regex for validating UK postcodes
//   const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
//   return postcodeRegex.test(postcode);
// }

// function isValidDate(date) {
//   return !isNaN(Date.parse(date));
// }

// function isValidImageUrl(url) {
//   return typeof url === "string" && url.match(/\.(jpeg|jpg|gif|png)$/) != null;
// }
// function isValidImage(value) {
//   // Example validation for image URL
//   // Adjust the regex or logic according to your needs
//   const imageUrlRegex = /\.(jpg|jpeg|png|gif)$/i;
//   return imageUrlRegex.test(value);
// }
// util/validation.js

////////////////////////////////////////////////////////////////////////////////////
// const db = require("../db");

// async function validateText(text) {
//   try {
//     const [rows] = await db.query("SELECT isValidText(?) AS result", [text]);
//     return rows[0].result;
//   } catch (error) {
//     console.error("Error validating text:", error);
//     throw error; // Rethrow or handle accordingly
//   }
// }

// // Repeat for other functions...

// async function validatePostcode(postcode) {
//   const [rows] = await db.query("SELECT isValidPostcode(?) AS result", [
//     postcode,
//   ]);
//   return rows[0].result;
// }

// async function validateDate(date) {
//   const [rows] = await db.query("SELECT isValidDate(?) AS result", [date]);
//   return rows[0].result;
// }

// async function validateImage(url) {
//   const [rows] = await db.query("SELECT isValidImage(?) AS result", [url]);
//   return rows[0].result;
// }

// module.exports = {
//   validateText,
//   validatePostcode,
//   validateDate,
//   validateImage,
// };

///////////////////////////////////////////////////////////////////////////////
// function isValidText(text) {
//   return typeof text === "string" && text.trim().length > 0;
// }

// function isValidPostcode(postcode) {
//   // A basic regex for validating UK postcodes
//   const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
//   return postcodeRegex.test(postcode);
// }

// function isValidDate(date) {
//   return !isNaN(Date.parse(date));
// }

// function isValidImage(value) {
//   // Example validation for image URL
//   // Adjust the regex or logic according to your needs
//   const imageUrlRegex = /\.(jpg|jpeg|png|gif)$/i;
//   return imageUrlRegex.test(value);
// }

// module.exports = {
//   isValidText,
//   isValidPostcode,
//   isValidDate,
//   isValidImage,
// };

///////////////////////////////////////////////////////////////
// util/validation.js

const ValidationService = require("../services/validation.service");

class Validator {
  static async validateText(text) {
    return ValidationService.validateText(text);
  }

  static async validatePostcode(postcode) {
    return ValidationService.validatePostcode(postcode);
  }

  static async validateDate(date) {
    return ValidationService.validateDate(date);
  }

  static async validateImage(url) {
    return true;
  }
}

module.exports = Validator;

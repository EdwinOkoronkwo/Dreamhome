// services/validation.service.js

const db = require("../db");

class ValidationService {
  static async validateText(text) {
    console.log("Validating text:", text); // Debug log
    return typeof text === "string" && text.trim().length > 0;
  }

  static async validatePostcode(postcode) {
    console.log("Validating postcode:", postcode); // Debug log
    // Example postcode validation logic
    //  return typeof postcode === "string" && /^[A-Z0-9]{5,7}$/.test(postcode);
    return true;
  }

  //   static async validateText(text) {
  //     try {
  //       const [rows] = await db.query("SELECT isValidText(?) AS result", [text]);
  //       return rows[0].result;
  //     } catch (error) {
  //       console.error("Error validating text:", error);
  //       throw error;
  //     }
  //   }

  //   static async validatePostcode(postcode) {
  //     try {
  //       const [rows] = await db.query("SELECT isValidPostcode(?) AS result", [
  //         postcode,
  //       ]);
  //       return rows[0].result;
  //     } catch (error) {
  //       console.error("Error validating postcode:", error);
  //       throw error;
  //     }
  //   }

  static async validateDate(date) {
    try {
      const [rows] = await db.query("SELECT isValidDate(?) AS result", [date]);
      return rows[0].result;
    } catch (error) {
      console.error("Error validating date:", error);
      throw error;
    }
  }

  static async validateImage(url) {
    try {
      if (!url) {
        console.log("Image URL is null or undefined.");
        return false;
      }
      const [rows] = await db.query("SELECT isValidImage(?) AS result", [url]);
      console.log("Image validation result from database:", rows[0].result);
      return rows[0].result === 1; // Ensure it returns a boolean value
    } catch (error) {
      console.error("Error validating image:", error);
      throw error;
    }
  }
}

module.exports = ValidationService;

// validators/staffValidators.js

const { check } = require("express-validator");

const validateStaffData = [
  check("fname")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Invalid first name."),

  check("lname").isString().trim().notEmpty().withMessage("Invalid last name."),

  check("position")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Invalid position."),

  check("dob").isISO8601().toDate().withMessage("Invalid date of birth."),

  check("email").isEmail().normalizeEmail().withMessage("Invalid email."),
];

module.exports = {
  validateStaffData,
};

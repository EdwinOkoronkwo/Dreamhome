const ValidationService = require("../util/validation");

class BranchValidationUtil {
  static async validateBranchData(branchData) {
    const errors = [];

    // Convert to string if the data is in an array
    const street = Array.isArray(branchData.street)
      ? branchData.street[0]
      : branchData.street;
    const city = Array.isArray(branchData.city)
      ? branchData.city[0]
      : branchData.city;
    const postcode = Array.isArray(branchData.postcode)
      ? branchData.postcode[0]
      : branchData.postcode;
    const image = Array.isArray(branchData.image)
      ? branchData.image[0]
      : branchData.image;

    // Validate street
    const isValidStreet = await ValidationService.validateText(street);
    console.log("Street validation:", isValidStreet, "Value:", street);
    if (!isValidStreet) {
      errors.push({ field: "street", message: "Invalid street." });
    }

    // Validate city
    const isValidCity = await ValidationService.validateText(city);
    console.log("City validation:", isValidCity, "Value:", city);
    if (!isValidCity) {
      errors.push({ field: "city", message: "Invalid city." });
    }

    // Validate postcode
    const isValidPostcode = await ValidationService.validatePostcode(postcode);
    console.log("Postcode validation:", isValidPostcode, "Value:", postcode);
    if (!isValidPostcode) {
      errors.push({ field: "postcode", message: "Invalid postcode." });
    }

    // Bypass image validation
    return errors;
  }
}

module.exports = BranchValidationUtil;

const { validateText, validatePostcode } = require("../util/validation");

async function testValidation() {
  try {
    const isTextValid = await validateText("Sample text");
    console.log("Text validation result:", isTextValid);

    const isPostcodeValid = await validatePostcode("12345");
    console.log("Postcode validation result:", isPostcodeValid);
  } catch (error) {
    console.error("Validation test error:", error);
  }
}

testValidation();

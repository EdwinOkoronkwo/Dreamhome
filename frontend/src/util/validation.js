// utils/validation.js

const VALIDATION_BASE_URL = "http://localhost:3000/api/validate";

export async function validateText(text) {
  const response = await fetch(`${VALIDATION_BASE_URL}/validate-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while validating the text");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { isValid } = await response.json();
  return isValid;
}

export async function validatePostcode(postcode) {
  const response = await fetch(`${VALIDATION_BASE_URL}/validate-postcode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postcode }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while validating the postcode");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { isValid } = await response.json();
  return isValid;
}

// Similar functions for date and image validation

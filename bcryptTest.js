const bcrypt = require("bcryptjs");

// Replace these with the actual values!
const hashedPasswordFromDB = "$2a$10$TaOQlPEzXFdDKrLUEM3WlumYGCInfqFhxa4oGSytKTelgR3rgiR6e"  // Replace with the actual hashed password from your DB
const plainPassword = "FMT-ech123";        // The plain text password you want to test

(async () => {
  const match = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
  console.log("Password match?", match);
})();

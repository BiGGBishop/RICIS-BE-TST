const AdminRepo = require("../repositories/adminRepo");

const bcrypt = require('bcryptjs');

async function createAdminUser(adminData) {
  try {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = await AdminRepo.createAdminUser({
      ...adminData,
      password: hashedPassword,
    });
    console.log("Admin user created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Example usage:
const adminData = {
  email: "admin@example.com",
  password: "securePassword",
  full_name: "Admin User",
  ref_number: "REF123",
  address: "Admin Address",
  phone_number: "123-456-7890",
  userroleId: 1, // Assuming 'admin' role id is 1
  user_status: "approved",
  payment_status: "paid",
};

createAdminUser(adminData);
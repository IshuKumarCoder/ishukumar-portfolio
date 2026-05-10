const bcrypt = require("bcryptjs");

async function generateHash() {
  const hash = await bcrypt.hash("ISHUkumar@123portfolio", 10);

  console.log(hash);
}

generateHash();
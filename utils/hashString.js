const crypto = require("crypto");

module.exports = {
    hashString,
};

/**
* Hashes a given string using a SHA256
* @param {string} secret - the string to hash
* @return {string} The hashed secret, given in hex encoding
*/
async function hashString(secret){
    let hashedSecret = await crypto.createHash("sha256").update(secret).digest("hex");
    return hashedSecret;
  }
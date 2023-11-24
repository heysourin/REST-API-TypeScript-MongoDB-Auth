//! Helpers for authentications: Helps to either encrypt a password or to create a random token

import crypto from "crypto";
const SECRET = process.env.SECRET;
if (!SECRET) {
  throw new Error("SECRET Token Error!!!");
}

export const random = () => {  
  return crypto.randomBytes(128).toString("base64");
};

// TypeScript error check

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

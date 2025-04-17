import bcrypt from "bcryptjs";

export const doHash = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

export const compareHash = async (password, hash) => {
  return await bcrypt.compare(password, hashedPassword);
};

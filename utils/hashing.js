import bcrypt from "bcryptjs";

export const doHash = async (value, salt) => {
  return await bcrypt.hash(value, salt);
};

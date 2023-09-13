import { customAlphabet } from "nanoid";

export const generateToken = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 50);

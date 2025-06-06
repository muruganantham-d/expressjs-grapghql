import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

export const verifyUser = (token) => {
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

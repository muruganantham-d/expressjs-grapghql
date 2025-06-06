import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const resolvers = {
  Query: {
    getUser: async (_, { id }) => await User.findById(id),
    getUsers: async () => await User.find(),
  },

  Mutation: {
    createUser: async (_, { name, email, password, age, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email already exists');

      const user = new User({ name, email, password, age, role });
      return await user.save();
    },

    signInUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      const token = generateToken(user);
      return { token, user };
    }
  }
};

export default resolvers;

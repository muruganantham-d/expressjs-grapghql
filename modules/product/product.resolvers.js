import Product from '../../models/Product.js';
import { verifyUser } from '../../utils/auth.js';

const resolvers = {
  Query: {
    getProducts: async () => await Product.find(),
    getProduct: async (_, { id }) => await Product.findById(id)
  },

  Mutation: {
    createProduct: async (_, { name, price, stock }, context) => {
      const user = verifyUser(context.token);
      if (user.role !== 'admin') throw new Error('Access denied: Admins only');

      const product = new Product({ name, price, stock });
      return await product.save();
    },

    updateProduct: async (_, { id, ...fields }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Only admins can update products');
      }

      return await Product.findByIdAndUpdate(id, fields, { new: true });
    },

    deleteProduct: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Only admins can delete products');
      }

      await Product.findByIdAndDelete(id);
      return `Product with ID ${id} deleted.`;
    }
  }
};

export default resolvers;

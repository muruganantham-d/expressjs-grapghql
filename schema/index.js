import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from '../modules/user/user.typeDefs.js';
import userResolvers from '../modules/user/user.resolvers.js';
import productTypeDefs from '../modules/product/product.typeDefs.js';
import productResolvers from '../modules/product/product.resolvers.js';

export const typeDefs = mergeTypeDefs([userTypeDefs, productTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, productResolvers]);

import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
});
export default mongoose.model('Product', ProductSchema);

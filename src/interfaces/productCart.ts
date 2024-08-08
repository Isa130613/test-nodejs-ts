import CartModel from '../models/cartModel';
import ProductModel from '../models/productModel';

export default interface ProductCartType {
  id?: number;
  quantity: number;
  cartId: number;
  cart: CartModel;
  productId: number;
  product: ProductModel;
}

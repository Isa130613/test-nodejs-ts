import ProductCartType from './productCart';

export default interface OrderType {
  id: number;
  userId: number;
  productCartId: number;
  productCart: ProductCartType;
  total: number;
}

class CartItem {
  constructor(
    quantity,
    productPrice,
    productTitle,
    sum,
    imageProduct,
    productId,
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.imageProduct = imageProduct;
    this.productId = productId;
  }
}
export default CartItem;

import {
  ADD_TO_CART,
  CHANGE_CART_ITEM
} from '../actions/cart'

import CartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalAmount: 0,
  totalQuantity: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const imagePro = addedProduct.imageUrl
      let updatedOrNewCartItem;
      let total = 0;
      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
          imagePro,
          addedProduct.id
        );
        total = total + 1
      } else {

        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice, imagePro, addedProduct.id);
        total = 1
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
        totalQuantity: total + state.totalQuantity

      };

    case CHANGE_CART_ITEM:
      const selectedCartItem = state.items[action.prod]
      const valueChange = action.changeValue
      const prodPriceChange = selectedCartItem.productPrice
      const prodTitleChange = selectedCartItem.productTitle
      const imageProChange = selectedCartItem.imageProduct
      let totalAmountChange
      let totalProduct;
      //console.log(action.prod.imageUrl)
      let changeCartItem;
      if (valueChange > 0) {
        selectedCartItem.sum = 0
        changeCartItem = new CartItem(
          valueChange,
          prodPriceChange,
          prodTitleChange,
          prodPriceChange * valueChange,
          imageProChange,
          action.prod
        )
        if (valueChange > selectedCartItem.quantity) {
          totalAmountChange = state.totalAmount + ((valueChange - selectedCartItem.quantity) * prodPriceChange)
          totalProduct = state.totalQuantity + (valueChange - selectedCartItem.quantity)
        } else {
          totalAmountChange = state.totalAmount - ((selectedCartItem.quantity - valueChange) * prodPriceChange)
          totalProduct = state.totalQuantity - (selectedCartItem.quantity - valueChange)

        }
        changeCartItem = { ...state.items, [action.prod]: changeCartItem }

        //totalAmountChange = 
      } else if (valueChange == 0) {
        changeCartItem = { ...state.items };
        totalAmountChange = state.totalAmount - selectedCartItem.sum
        totalProduct = state.totalQuantity - selectedCartItem.quantity
        delete changeCartItem[action.prod]
      }
      return {
        ...state,
        items: changeCartItem,
        totalAmount: totalAmountChange,
        totalQuantity: totalProduct
      }
  }
  return state;
}
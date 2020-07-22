import {ADD_TO_CART, CHANGE_CART_ITEM} from '../actions/cart';

import CartItem from '../../models/cart-item';

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
      const imagePro = addedProduct.imageUrl;
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
          addedProduct.id,
        );
        total = total + 1;
      } else {
        //add new item in the cart
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          imagePro,
          addedProduct.id,
        );
        total = 1;
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
        totalQuantity: total + state.totalQuantity,
      };
    case CHANGE_CART_ITEM:
      let updateCarrtItem = {...state.items};
      let totalAmountChange = 0;
      let totalProductChange = 0;
      const productIdChange = action.productId;
      const prodPriceUpdate = state.items[productIdChange].productPrice;
      const prodTitleUpdate = state.items[productIdChange].productTitle;
      const imageProUpdate = state.items[productIdChange].imageProduct;

      //console.log('cart khi chua update',state.items)
      if (action.changeValue == 0) {
        totalAmountChange =
          state.totalAmount - state.items[productIdChange].sum;
        totalProductChange =
          state.totalQuantity - state.items[productIdChange].quantity;
        delete updateCarrtItem[productIdChange];
      } else {
        const oldQuantity = state.items[productIdChange].quantity;
        const oldSum = state.items[productIdChange].sum;
        updateCarrtItem = {
          ...state.items,
          [productIdChange]: new CartItem(
            action.changeValue,
            prodPriceUpdate,
            prodTitleUpdate,
            action.changeValue * prodPriceUpdate,
            imageProUpdate,
            productIdChange,
          ),
        };
        if (action.value > oldQuantity) {
          totalProductChange =
            state.totalQuantity + (action.changeValue - oldQuantity);
          totalAmountChange =
            state.totalAmount +
            (action.changeValue - oldQuantity) * prodPriceUpdate;
        } else {
          totalProductChange =
            state.totalQuantity - (oldQuantity - action.changeValue);
          totalAmountChange =
            state.totalAmount -
            (oldQuantity - action.changeValue) * prodPriceUpdate;
        }
      }
      //console.log(totalAmountChange)
      // console.log('truoc khi thay doi',state.totalAmount)
      // console.log('cart da update',updateCarrtItem)
      // console.log('sau khi thay doi',totalAmountChange)
      // for (var i = 0; i < count; i++) {
      //   totalAmountChange = totalAmountChange + state.items[i].quantity * state.items[i].price;
      //   totalProductChange = totalProductChange + state.items[i].quantity;
      // }
      return {
        ...state,
        items: updateCarrtItem,
        totalAmount: totalAmountChange,
        totalQuantity: totalProductChange,
      };
  }
  return state;
};

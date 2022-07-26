  import axios from 'axios';
  
  import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART
} from '../constants/cartConstants';


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/v1/productbyid/${id}`);

 if(data.product.stock < 1) return;
  
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      slug: data.product.slug,
      price: data.product.price,
      featured_image: data.product.featured_image,
      stock: data.product.stock,
      quantity
    }
  }) 
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO , payload: data });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
}


export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });

  localStorage.removeItem('cartItems');
}

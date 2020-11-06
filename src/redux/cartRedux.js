
/* selectors */
export const getCart = ({ cart }) => cart;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addProductToCart = payload => ({ payload, type: ADD_TO_CART });
export const removeProductFromCart = payload => ({ payload, type: REMOVE_FROM_CART });


/* thunk creators */
export const saveCartRequest = data => {
  return dispatch => {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    if (cartProducts) {

      for (const product of cartProducts) {
        if (product.id === data.id) {
          if (data.minus) {
            if (product.amount > 1) {
              product.amount = parseInt(product.amount) - parseInt(data.amount);
              localStorage.setItem('cart', JSON.stringify([...cartProducts]));
              dispatch(addProductToCart([...cartProducts]));
            }
            return;
          }
          if (product.amount < 5) {
            product.amount = parseInt(product.amount) + parseInt(data.amount);

            localStorage.setItem('cart', JSON.stringify([...cartProducts]));
            dispatch(addProductToCart([...cartProducts]));
          }
          return;
        }
      }

      localStorage.setItem('cart', JSON.stringify([...cartProducts, data]));
      dispatch(addProductToCart([...cartProducts, data]));
    } else {

      localStorage.setItem('cart', JSON.stringify([data]));
      dispatch(addProductToCart([data]));
    }
  };
};

export const removeCartItem = (id) => {

  return dispatch => {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));

    const newCart = [];
    for (const product of cartProducts) {
      if (product.id !== id) {
        newCart.push(product);
      }
    }
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(newCart));
    dispatch(addProductToCart(newCart));
    return;
  };
};

export const loadCartRequest = () => {
  return dispatch => {
    let getSavedCart;
    localStorage.getItem('cart') ?
      getSavedCart = JSON.parse(localStorage.getItem('cart')) : getSavedCart = [];
    dispatch(addProductToCart(getSavedCart));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        products: action.payload ? action.payload : [],
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_TO_CART: {
      return {
        ...statePart,
        products: action.payload,
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...statePart,
        products: statePart.products.filter(product => product._id !== action.payload._id),
      };
    }
    default:
      return statePart;
  }
};
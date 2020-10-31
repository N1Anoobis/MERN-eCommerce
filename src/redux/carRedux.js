import Axios from 'axios';
/* selectors */
export const readCars = ({ cars }) => cars.data;
export const currentCar = ({ cars }) => cars.currentProduct;
export const getViewMode = ({ cars }) => cars.mode;

/* action name creator */
const reducerName = 'cars';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_CAR = createActionName('FETCH_CAR');
const SET_MODE = createActionName('SET_MODE');
const ADD_CART = createActionName('ADD_CART');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchSingleCar = payload => ({ payload, type: FETCH_CAR });
export const setGlobalViewPort = payload => ({ payload, type: SET_MODE });
export const addToBasket = payload => ({ payload, type: ADD_CART });
/* thunk creators */
export const loadCars = () => {
  return (dispatch, getState) => {

    dispatch(fetchStarted());
    Axios
      .get('http://localhost:8000/api/cars')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const getSingleCar = (id) => {
  return async (dispatch, state) => {

    dispatch(fetchStarted());
    Axios.get(`http://localhost:8000/api/car/${id}`)
      .then(res => {
        dispatch(fetchSingleCar(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
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
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
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
    case FETCH_CAR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        currentProduct: action.payload,
      };
    }
    case SET_MODE: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        mode: action.payload,
      };
    }
    case ADD_CART: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        cart: action.payload,
      };
    }
    default:
      return statePart;
  }
};

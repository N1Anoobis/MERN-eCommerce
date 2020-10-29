import Axios from 'axios';
/* selectors */
export const readCars = ({ cars }) => cars.data;
export const currentCar = ({ cars }) => cars.currentProduct;

/* action name creator */
const reducerName = 'cars';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_CAR = createActionName('FETCH_CAR');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchSingleCar = payload => ({ payload, type: FETCH_CAR });
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
    default:
      return statePart;
  }
};

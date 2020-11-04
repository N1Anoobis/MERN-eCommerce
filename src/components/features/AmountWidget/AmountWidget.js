import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { saveCartRequest } from '../../../redux/cartRedux';

import styles from './AmountWidget.module.scss';

const AmountWidget = ({ className, amount, saveToCart, id }) => {
  const [number, setNumber] = useState([amount]);
  // console.log(id)

  const plus = (id) => {
    if (number < 5) {
      setNumber(parseInt(number) + 1);
    }
    saveToCart(id, 1);
  };

  const minus = (id) => {
    if (number > 0) {
      setNumber(parseInt(number - 1));
    }
    saveToCart(id, 1, 'decrease');
  };







  return (
    <div value={number} className={clsx(className, styles.root)}>
      <p onClick={() => minus(id)} className={styles.arrow}>-</p>{number}<p onClick={() => plus(id)} className={styles.arrow}>+</p>
    </div>
  );
};

AmountWidget.propTypes = {
  amount: PropTypes.string,
  className: PropTypes.string,
  saveToCart: PropTypes.func,
  id: PropTypes.string,
};

// const mapStateToProps = state => ({
// someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
  saveToCart: (id, amount, minus ) => dispatch(saveCartRequest({ id, amount,minus })),
});

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
export default connect(null, mapDispatchToProps)(AmountWidget);
// export default AmountWidget;
// export {
//   Component as AmountWidget,
//   // Container as AmountWidget,
//   Component as AmountWidgetComponent,
// };

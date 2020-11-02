import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { loadCartfromLocalStorage, getCart } from '../../../redux/cartRedux';

import styles from './Cart.module.scss';

const Component = ({ className, showCart, cart }) => {
  // const login = localStorage.getItem('login');

  // const cartProducts = JSON.parse(localStorage.getItem('cart'));
  useEffect(() => {
    showCart();

  }, []);

  let currentCart = cart.car;
  return (
    <div className={clsx(className, styles.root)}>
      <h2>{currentCart}</h2>
      {/* {cartProducts[0]} */}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  showCart: () => dispatch(loadCartfromLocalStorage()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};

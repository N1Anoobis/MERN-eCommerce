import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NavBar from '../../features/Navbar/Navbar';
import NavBarMobile from '../../features/NavBarMobile/NavBarMobile';
import { connect } from 'react-redux';
import { setGlobalViewPort } from '../../../redux/carRedux';
import { loadCartfromLocalStorage, getCart } from '../../../redux/cartRedux';
import styles from './Header.module.scss';

const Component = ({ className, setViewPort, cart, showCart}) => {

  let mode = null;
  const [size, setSize] = useState([0]);

  if (size < 400) {
    mode = 'mobile';
  } else if (size < 700) { mode = 'tablet'; }
  else {
    mode = 'desktop';
  }
  useLayoutEffect(() => {
    showCart()
    // getCart()
    function updateSize() {
      setSize([window.innerWidth]);

    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);

  }, []);
  console.log(cart.cart) 
  setViewPort(mode);
  return (
    <div className={clsx(className, styles.root)}>
      {mode === 'desktop' || mode === 'tablet' ? <NavBar cart={cart}/> : <NavBarMobile  mode={'mobile'} />}
    </div >
  );
};

Component.propTypes = {
  setViewPort: PropTypes.func,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  setViewPort: (mode) => dispatch(setGlobalViewPort(mode)),
  showCart: () => dispatch(loadCartfromLocalStorage()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};

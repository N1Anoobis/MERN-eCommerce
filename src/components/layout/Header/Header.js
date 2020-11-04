import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NavBar from '../../features/Navbar/Navbar';
import NavBarMobile from '../../features/NavBarMobile/NavBarMobile';
import { connect } from 'react-redux';
import { setGlobalViewPort } from '../../../redux/carRedux';
import { getCart, loadCartRequest } from '../../../redux/cartRedux';
import styles from './Header.module.scss';

const Component = ({ className, setViewPort, cart, showCart }) => {

  let mode = null;
  const [size, setSize] = useState([0]);

  if (size < 400) {
    mode = 'mobile';
  } else if (size < 700) { mode = 'tablet'; }
  else {
    mode = 'desktop';
  }

 
  useLayoutEffect(() => {

    showCart();
    function updateSize() {
      setSize([window.innerWidth]);

    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);

  }, []);

  setViewPort(mode);
  return (
    <div className={clsx(className, styles.root)}>
      {mode === 'desktop' || mode === 'tablet' ? <NavBar /> : <NavBarMobile mode={'mobile'} />}
    </div >
  );
};

Component.propTypes = {
  setViewPort: PropTypes.func,
  className: PropTypes.string,
  cart: PropTypes.object,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  setViewPort: (mode) => dispatch(setGlobalViewPort(mode)),
  showCart: () => dispatch(loadCartRequest()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};

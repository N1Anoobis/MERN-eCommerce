import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, h5,
} from 'reactstrap';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';

import styles from './Navbar.module.scss';

const NavBar = ({ className, cart }) => {

  const cartArray = cart.products.filter(prod => (!Array.isArray(prod)));

  return (
    <nav className={clsx(className, styles.nav)}>
      <NavLink to={`/`}><h5 className={styles.menuItem}>Home</h5></NavLink>
      {cart.products[0] && <NavLink className={styles.cart} to={`/cart`}><h5 className={styles.menuItem}>Cart <Badge color="danger" pill>{cart.products[0] && cartArray.length}</Badge></h5></NavLink>}
      <NavLink className={styles.login} to={'/login'}><h5  >Login</h5></NavLink>
    </nav>
  );
};

NavBar.propTypes = {
  cart: PropTypes.object,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

export default connect(mapStateToProps)(NavBar);


// export {
//   Component as Navbar,
//   // Container as Navbar,
//   Component as NavbarComponent,
// };
// export default NavBar;
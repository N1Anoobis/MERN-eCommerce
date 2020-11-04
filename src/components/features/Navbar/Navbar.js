import React from 'react';
import PropTypes from 'prop-types';
import {
  NavbarBrand, Badge,
} from 'reactstrap';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';

import styles from './Navbar.module.scss';

const NavBar = ({ className, cart }) => {

  return (
    <nav className={clsx(className, styles.nav)}>
      <NavbarBrand className={styles.menuItem} href="/">Home</NavbarBrand>
      {cart.products[0] && <NavbarBrand className={styles.menuItem} href="/cart">Cart <Badge color="danger" pill>{cart.products[0] && cart.products.length}</Badge></NavbarBrand>}
      <NavbarBrand className={styles.login} href="https://google.com">Login</NavbarBrand>
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
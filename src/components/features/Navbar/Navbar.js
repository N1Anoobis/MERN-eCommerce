import React from 'react';
import PropTypes from 'prop-types';
import {
  NavbarBrand,
} from 'reactstrap';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Navbar.module.scss';

const NavBar = ({ className }) => (

  <nav className={clsx(className, styles.nav)}>
    <NavbarBrand className={styles.menuItem} href="/">Home</NavbarBrand>
    <NavbarBrand className={styles.menuItem} href="/cart">Cart</NavbarBrand>
    <NavbarBrand className={styles.login} href="https://google.com">Login</NavbarBrand>
  </nav>

);

NavBar.propTypes = {
  // children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

// export {
//   Component as Navbar,
//   // Container as Navbar,
//   Component as NavbarComponent,
// };
export default NavBar;
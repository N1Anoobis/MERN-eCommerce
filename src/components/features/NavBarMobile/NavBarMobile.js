import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
  NavbarBrand, Badge,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import styles from './NavBarMobile.module.scss';

const NavBarMobile = ({ className, cart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const cartArray = cart.products.filter(prod => (!Array.isArray(prod)));

  return (
    <nav className={clsx(className, styles.nav)}>
      <NavbarBrand className={styles.hamburger} onClick={toggle}>{isOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}</NavbarBrand>
      {isOpen ? <div className={styles.open}>
        <NavLink className={styles.menuItem} onClick={toggle} to={`/`}><h5>Home</h5></NavLink>
        {cart.products[0] && <NavLink className={styles.cart} onClick={toggle} to={`/cart`}><h5 className={styles.menuItem}>Cart <Badge color="danger" pill>{cart.products[0] && cartArray.length}</Badge></h5></NavLink>}
        <NavLink className={styles.login} onClick={toggle} to='/login'><h5>Login</h5></NavLink></div> : null}
    </nav>
  );
};

NavBarMobile.propTypes = {
  cart: PropTypes.object,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default connect(mapStateToProps)(NavBarMobile);
// export default NavBarMobile;
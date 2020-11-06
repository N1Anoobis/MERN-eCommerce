import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
  NavbarBrand,
} from 'reactstrap';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import styles from './NavBarMobile.module.scss';

const NavBarMobile = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={clsx(className, styles.nav)}>
      <NavbarBrand className={styles.hamburger} onClick={toggle}>{isOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}</NavbarBrand>
      {isOpen ? <div className={styles.open}>
        <NavLink className={styles.menuItem} onClick={toggle} to={`/`}><h5>Home</h5></NavLink>
        <NavLink className={styles.menuItem} onClick={toggle} to={'/cart'}><h5>Cart</h5></NavLink>
        <NavLink className={styles.login} onClick={toggle} to='/login'><h5>Login</h5></NavLink></div> : null}
    </nav>
  );
};

NavBarMobile.propTypes = {
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

export default NavBarMobile;
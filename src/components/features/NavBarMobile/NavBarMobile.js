import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
  NavbarBrand,
} from 'reactstrap';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import 'font-awesome/css/font-awesome.min.css';
import styles from './NavBarMobile.module.scss';

const NavBarMobile = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen)
  const toggle = () => {
    setIsOpen(!isOpen);


  };
  return (
    <nav className={clsx(className, styles.nav)}>
      <NavbarBrand className={styles.hamburger} onClick={toggle}>{isOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}</NavbarBrand>
      {isOpen ? <div className={styles.open}> <NavbarBrand className={styles.menuItem} href='/'>Home</NavbarBrand>
        <NavbarBrand className={styles.menuItem} href='/cart'>Cart</NavbarBrand>
        <NavbarBrand className={styles.login} href='https://google.com'>Login</NavbarBrand></div> : null}
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
import React, { useState, useLayoutEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  // NavItem,
  // NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import NavBar from '../../features/Navbar/Navbar';
import NavBarMobile from '../../features/NavBarMobile/NavBarMobile';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, children }) => {

  let mode = null;
  const [size, setSize] = useState([0]);
  size < 400 ? mode = 'mobile' : mode = 'desktop';
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  // console.log(isOpen);
  return (
    <div className={clsx(className, styles.root)}>
      {mode === 'desktop' ? <NavBar /> : <NavBarMobile mode={'mobile'}/>}
    </div >
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};

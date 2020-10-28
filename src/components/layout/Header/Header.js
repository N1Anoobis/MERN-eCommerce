import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  // Nav,
  // NavItem,
  // NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={clsx(className, styles.root)}>
      <Navbar color="light" light expand="md">
        <NavbarBrand className={styles.menuItem} href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* <Nav className="mr-auto" navbar> */}
          <NavbarBrand href="/cart">
            <Button outline color="secondary">Cart</Button>{' '}
          </NavbarBrand>
          {/* </Nav> */}
          <NavbarBrand className={styles.login} href="https://github.com/reactstrap/reactstrap" >
            <Button outline color="success">Login</Button>{' '}
          </NavbarBrand>
        </Collapse>
      </Navbar>
    </div>
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

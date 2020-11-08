import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { Footer } from '../../views/Footer/Footer';
import { Header } from '../../layout/Header/Header';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { Splash } from '../../features/Splash/Splash';
import styles from './MainLayout.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Splash />
    <Header />
    {children}
   
    {/* <Footer /> */}
  </div>
);

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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Footer.module.scss';

const Component = ({ className, children }) => {
  // <div className={clsx(className, styles.root)}>
  return (

    <Breadcrumb className={clsx(className, styles.root)}>
      <BreadcrumbItem active>Home</BreadcrumbItem>
    </Breadcrumb>


  );
  // </div>
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
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};

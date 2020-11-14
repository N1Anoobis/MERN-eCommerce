import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Splash.module.scss';

import { connect } from 'react-redux';
import {  loadCars } from '../../../redux/carRedux';

const Component = ({ className, getCars }) => {

  const [flag, setFlag] = useState(false);
  const hideSplash = () => {
    scroolChange();
    setFlag(true);
  };

  const scroolChange = () => {
    window.scrollTo(0, 0);
  };

  getCars();

  return (
    <div className={clsx(className, styles.root)} onClick={hideSplash} >

      <div className={flag ? styles.hide : styles.show}>

        <h2 className={styles.header}>
          {/* <img src="lamb.png" alt="" /> */}
        </h2>
      </div>
    </div >
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getCars: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  getCars: () => dispatch(loadCars()),
});

const Container = connect(null, mapDispatchToProps)(Component);

export {
  Container as Splash,
  Component as SplashComponent,
};
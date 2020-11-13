import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Splash.module.scss';

const Component = ({ className }) => {

  const [flag, setFlag] = useState(false);
  const hideSplash = () => {
    scroolChange();
    setFlag(true);
  };

  const scroolChange = () => {
    window.scrollTo(0, 0);
  };

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
};

export {
  Component as Splash,
  Component as SplashComponent,
};

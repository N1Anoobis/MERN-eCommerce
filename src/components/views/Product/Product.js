import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, CardImg } from 'reactstrap';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Carusel from '../../features/Carusel/Carusel'
import { connect } from 'react-redux';
import { getSingleCar, currentCar } from '../../../redux/carRedux';

import styles from './Product.module.scss';

const Component = ({ className, getCar, car }) => {

  const params = useParams();
  useEffect(() => {
    getCar(params.id);

  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      {car && <Jumbotron>
        <h1 className="display-4">{car.mark} {car.model}</h1>
        <Carusel className={styles.dimentions} />
        {/* <CardImg top src={car.img} alt="Card image cap" /> */}
        <p className="lead">This is uniqe mashine cost only {car.price}, it is run by {car.engine} engine. We can assemble for you one form {car.year} calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>}
    </div>
  );
};

Component.propTypes = {
  car: PropTypes.object,
  className: PropTypes.string,
  getCar: PropTypes.func,
};

const mapStateToProps = state => ({
  car: currentCar(state),
});

const mapDispatchToProps = dispatch => ({
  getCar: (id) => dispatch(getSingleCar(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};

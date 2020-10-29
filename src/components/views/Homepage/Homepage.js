import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readCars, loadCars } from '../../../redux/carRedux';
import { Link } from 'react-router-dom';
// import clsx from 'clsx';
// import Carusel from '../../features/Carusel/Carusel'
import { useHistory } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({ className, getCars, cars }) => {
  const history = useHistory();
  useEffect(() => {
    getCars();
  }, []);

  // console.log(props);
  let carsArray = [];
  if (cars) {
    for (let i = 0; i < cars.length; i++) {
      carsArray.push(cars[i]);
    }
  }
  
  const routeChange = (id) => {
    let path = `/product/${id}`;
    history.push(path);
  };

  return (
    <div className={styles.root}>
      {/* <Carusel/> */}
      {(cars) && carsArray.map((car) => <Card key={car._id} className={styles.car} >
        <CardImg top src={car.img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{car.mark}</CardTitle>
          <CardSubtitle>{car.model}</CardSubtitle>
          <CardText>{car._id}</CardText>
          <Button onClick={()=>routeChange(car._id)} >Details</Button>
        </CardBody>
      </Card>)}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getCars: PropTypes.func,
  cars: PropTypes.any,
};

const mapStateToProps = (state) => ({
  cars: readCars(state),
});

const mapDispatchToProps = dispatch => ({
  getCars: () => dispatch(loadCars()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
// export default connect(mapStateToProps,{getCars})(Component);
export {

  Container as Homepage,
  Component as HomepageComponent,
};

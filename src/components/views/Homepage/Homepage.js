import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readCars, loadCars } from '../../../redux/carRedux';
// import clsx from 'clsx';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
} from 'reactstrap';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({ className, getCars, cars}) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [animating, setAnimating] = useState(false);

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
  return (
    <div className={styles.root}>
      {(cars) && carsArray.map((car) => <Card key={car._id} className={styles.car} >
        <CardImg  top  src={car.img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{car.mark}</CardTitle>
          <CardSubtitle>{car.model}</CardSubtitle>
          <CardText>{car._id}</CardText>
          <Button>Details</Button>
        </CardBody>
      </Card>)}
      {(cars) && carsArray.map((car) => <Card key={car._id} className={styles.car} >
        <CardImg  top  src={car.img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{car.mark}</CardTitle>
          <CardSubtitle>{car.model}</CardSubtitle>
          <CardText>{car._id}</CardText>
          <Button>Details</Button>
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

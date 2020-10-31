import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, FormGroup, Label, Input } from 'reactstrap';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Carusel from '../../features/Carusel/Carusel';
import { connect } from 'react-redux';
import { getSingleCar, currentCar, addToBasket } from '../../../redux/carRedux';

import styles from './Product.module.scss';

const Component = ({ className, getCar, car, addCart }) => {

  const [quantity, setQuantity] = useState('1');
  const params = useParams();
  useEffect(() => {
    getCar(params.id);
  }, []);

  const addToCart = () => {

    const data = {
      car: car._id,
      quantity,
    };
    console.log(data);
    addCart(data);
  };


  return (
    <div className={clsx(className, styles.root)}>
      {car && <Jumbotron>
        <h1 className="display-4">{car.mark} {car.model}</h1>
        <Carusel />
        {/* <CardImg top src={car.img} alt="Card image cap" /> */}
        <p className="lead">This is uniqe mashine cost only {car.price}, it is run by {car.engine} engine. We can assemble for you one form {car.year} calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button onClick={addToCart} outline color="success">Add To Cart</Button>
        </p>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input onChange={event => setQuantity(event.target.value)} className={styles.input} type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
      </Jumbotron>}
    </div>
  );
};

Component.propTypes = {
  car: PropTypes.object,
  className: PropTypes.string,
  getCar: PropTypes.func,
  addCart: PropTypes.object,
};

const mapStateToProps = state => ({
  car: currentCar(state),
});

const mapDispatchToProps = dispatch => ({
  getCar: (id) => dispatch(getSingleCar(id)),
  addCart: (data) => dispatch(addToBasket(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};

import React, { useEffect, useState, useHistory } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, FormGroup, Label, Input } from 'reactstrap';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Carusel from '../../features/Carusel/Carusel';
import { connect } from 'react-redux';
import { getSingleCar, currentCar } from '../../../redux/carRedux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveCartRequest } from '../../../redux/cartRedux';
import { Link } from 'react-router-dom';
import styles from './Product.module.scss';

const Component = ({ className, getCar, car, saveToCart }) => {

  const [quantity, setQuantity] = useState('1');
  const params = useParams();

  useEffect(() => {

    getCar(params.id);
  }, []);

  const addToCart = () => {
    saveToCart(car._id, quantity, car.mark, car.model, car.price, car.engine,);
    toggle();
  };


  // const routeChange = () => {
  //   let path = `/cart`;
  // };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className={clsx(className, styles.root)}>

      <div>
        {/* <Button color="danger" onClick={toggle}></Button> */}
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Product added to cart</ModalHeader>
          <ModalBody>
            You have just aded {quantity} to cart. You can allways adjust number of cars in cart.
            Thank You for chosing our company
          </ModalBody>
          <ModalFooter>
            <Button color="info" href="/cart">Go to cart</Button>{' '}
            <Button color="info" onClick={toggle}>Continioues</Button>
          </ModalFooter>
        </Modal>
      </div>

      {car && <Jumbotron className={styles.jumbo}>
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
  saveToCart: PropTypes.func,
};

const mapStateToProps = state => ({
  car: currentCar(state),
});

const mapDispatchToProps = dispatch => ({
  getCar: (id) => dispatch(getSingleCar(id)),
  saveToCart: (id, amount, mark, model, price, engine) => dispatch(saveCartRequest({ id, amount, mark, model, price, engine })),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};

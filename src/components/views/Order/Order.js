import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import clsx from 'clsx';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isPostalCode from 'validator/lib/isPostalCode';
import { connect } from 'react-redux';
import { getCart, newOrder, removeCart, loadCartRequest } from '../../../redux/cartRedux';
import ErrorDisplay from '../../features/ErrorDisplay/ErrorDisplay';
import styles from './Order.module.scss';
import { Redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Component = ({ className, cart, sendOrderRequest, clearLocalStorage, loadCart }) => {


  let cartArray = [];
  useEffect(() => {
    cartArray = [];
  }, [cart.products]);


  const [modal, setModal] = useState(false);
  const [data, setData] = useState('');

  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    check: '',
    errorMsg: false,
  });

  const redirect = () => {
    sendOrderRequest(data);
    setFormData({
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      check: '',
    });
    clearLocalStorage();
  };

  const sendOrderToDB = () => {

    let carsArray = [];
    let specialRequest = '';
    const cartArray = Array.from(cart.products);
    for (const iterator of cartArray) {
      if (iterator[1] !== 'request') {
        carsArray.push(iterator);
      } else {
        specialRequest = iterator[0];
      }
    }

    const data = {
      products: carsArray,
      client: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      request: specialRequest,
    };
    setData(data)
    toggle();
    

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    const { name, email, address, city, zip, check } = formData;
    e.preventDefault();
    if (isEmpty(name) || isEmpty(email) || isEmpty(address) || isEmpty(city) || isEmpty(zip) || isEmpty(check)) {
      setFormData({
        ...formData, errorMsg: 'All fields requaierd',
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData, errorMsg: 'Invalide email',
      });
    } else if (!isPostalCode(zip, 'any')) {
      setFormData({
        ...formData, errorMsg: 'Invalide postcode',
      });
    } else if ((name.lenght < 3) || (address.lenght < 5) || (city.lenght < 3) || (zip < 5)) {
      setFormData({
        ...formData, errorMsg: 'Inputs need to have correct lenght',
      });
    } else {
      setFormData({
        ...formData, errorMsg: false,
      });
      sendOrderToDB();
    }
  };

  cartArray = Array.from(cart.products);

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Your order has been submited</ModalHeader>
          <ModalBody>
            We are very happy that you like our product. It will be delivered to you by drons in 7 days. 
            Thank You for chosing our company
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={redirect}>Continue</Button>
          </ModalFooter>
        </Modal>
      </div>

      {(!cartArray[0]) ? <Redirect to='/' /> : <div className={clsx(className, styles.root)}>
        {formData.errorMsg && <ErrorDisplay msg={formData.errorMsg} />}
        <Form
          onSubmit={handleSubmit}
        >
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Name</Label>
                <Input type="text" name="name" id="name" placeholder="name placeholder" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" onChange={handleChange} />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">City</Label>
                <Input type="text" name="city" id="exampleCity" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Post-Code</Label>
                <Input type="text" name="zip" id="exampleZip" onChange={handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className={styles.check} check>
            <Input type="checkbox" name="check" id="exampleCheck" onChange={handleChange} />
            <Label for="exampleCheck" check>Check me out</Label>
          </FormGroup>
          <Button>Buy it!</Button>
        </Form>
      </div>}
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.object,
  sendOrderRequest: PropTypes.func,
  clearLocalStorage: PropTypes.func,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  sendOrderRequest: data => dispatch(newOrder(data)),
  clearLocalStorage: () => dispatch(removeCart()),
  loadCart: () => dispatch(loadCartRequest()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Order,
  Container as Order,
  Component as OrderComponent,
};

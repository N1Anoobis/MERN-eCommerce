import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import clsx from 'clsx';
import validator from 'validator';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Order.module.scss';

const Component = ({ className, children }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    check: '',
    errorMsg: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isEmpty(name) || isEmpty(email) || isEmpty(address) || isEmpty(city) || isEmpty(zip) || isEmpty(check)) {
  //     setFormData({
  //       ...formData, errorMsg: 'All fields requaierd',
  //     });
  //   }else if(!isEmail) {
  //     setFormData({
  //       ...formData,errorMsg:'Invalide email',
  //     })
  //   }else if ()
  // };

  return (
    <div className={clsx(className, styles.root)}>
      <Form 
      // onSubmit={handleSubmit}
      >
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Name</Label>
              <Input type="text" name="name" id="name" placeholder="name placeholder" onChange={handleChange}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={handleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleAddress">Address</Label>
          <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" onChange={handleChange}/>
        </FormGroup>
        {/* <FormGroup>
          <Label for="exampleAddress2">Address 2</Label>
          <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
        </FormGroup> */}
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleCity">City</Label>
              <Input type="text" name="city" id="exampleCity" onChange={handleChange}/>
            </FormGroup>
          </Col>
          {/* <Col md={4}>
            <FormGroup>
              <Label for="exampleState">State</Label>
              <Input type="text" name="state" id="exampleState" />
            </FormGroup>
          </Col> */}
          <Col md={2}>
            <FormGroup>
              <Label for="exampleZip">Post-Code</Label>
              <Input type="text" name="zip" id="exampleZip" onChange={handleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className={styles.check} check>
          <Input type="checkbox" name="check" id="exampleCheck" onChange={handleChange}/>
          <Label for="exampleCheck" check>Check me out</Label>
        </FormGroup>
        <Button>Buy it!</Button>
      </Form>
    </div>
  );

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
  Component as Order,
  // Container as OrderSummary,
  Component as OrderComponent,
};

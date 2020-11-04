import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { ListGroup, ListGroupItem, Badge, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getCart, saveCartRequest } from '../../../redux/cartRedux';
import AmountWidget from '../../../components/features/AmountWidget/AmountWidget';

import styles from './Cart.module.scss';

const Component = ({ className, cart, getCar, saveToCart }) => {
  // const login = localStorage.getItem('login');
  const [quantity, setQuantity] = useState();
  let cartArray = []
  // const cartProducts = JSON.parse(localStorage.getItem('cart'));
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
     
      mounted.current = true;
      
    } else {
      // do componentDidUpdate logic
      cartArray = Array.from(cart.products)

    }
  });

  
  cartArray = Array.from(cart.products)
  // console.log(cartArray)
  return (
    // <div >
    <ListGroup >

   
      {cart && cartArray.map(product => <ListGroupItem className={clsx(className, styles.root)} key={product.id} >{product.product}<Badge pill>{product.mark}  {product.model} x</Badge> <AmountWidget id={product.id} amount={product.amount}/><Badge pill>Total Price: {quantity ? product.price * quantity : product.price * product.amount}</Badge> </ListGroupItem>)}
    </ListGroup>

  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  saveToCart: (id, amount, mark, model, price, engine) => dispatch(saveCartRequest({ id, amount, mark, model, price, engine })),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};

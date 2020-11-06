import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getCart, saveCartRequest, removeCartItem } from '../../../redux/cartRedux';
import AmountWidget from '../../../components/features/AmountWidget/AmountWidget';
import {
  NavbarBrand,
} from 'reactstrap';
import styles from './Cart.module.scss';
import { useHistory } from 'react-router-dom';
const Component = ({ className, cart, removeItem }) => {
  const history = useHistory();
  let cartArray = [];

  useEffect(() => {
    cartArray = [];
  }, [cart.products]);

  const remove = (id) => {
    removeItem(id);
  };

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  cartArray = Array.from(cart.products);
  if (!cartArray.length) {
    routeChange();
  }
  return (
    <>
      {cartArray && <ListGroup className={clsx(className, styles.root)}>
        {cartArray.map(product =>
          <ListGroupItem className={styles.single} key={product.id} >{product.product}
            < NavbarBrand >{product.mark}  {product.model} </ NavbarBrand>
            {product.amount && <AmountWidget id={product.id} amount={product.amount} />}
            {product.price && < NavbarBrand >  Total Price: {product.price * product.amount}</ NavbarBrand>}
            <div onClick={() => remove(product.id)} className={styles.exit}>X</div>
          </ListGroupItem>)}
      </ListGroup>
      }
      {cartArray.length ? <NavLink className={styles.link} to={`/order`}><Button outline color="success">Order it!</Button></NavLink> : null}
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.object,
  removeItem: PropTypes.func,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  saveToCart: (id, amount, mark, model, price, engine) => dispatch(saveCartRequest({ id, amount, mark, model, price, engine })),
  removeItem: (id) => dispatch(removeCartItem(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};

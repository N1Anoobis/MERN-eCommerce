import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { ListGroup, ListGroupItem, Button ,NavbarBrand} from 'reactstrap';
import { connect } from 'react-redux';
import { getCart, removeCartItem } from '../../../redux/cartRedux';
import AmountWidget from '../../../components/features/AmountWidget/AmountWidget';
import SpecialRequest from '../../../components/features/SpecialRequest/SpecialRequest';
import styles from './Cart.module.scss';

const Component = ({ className, cart, removeItem }) => {

  let cartArray = [];

  useEffect(() => {
    window.scrollTo(0, 0);
    cartArray = [];
  }, []);

  const remove = (id) => {
    removeItem(id);
  };

  cartArray = Array.from(cart.products);

  return (
    <>
      {cartArray.length ? <ListGroup className={clsx(className, styles.root)}>
        {cartArray.map(product =>
          <ListGroupItem className={styles.single} key={product.id ? product.id : product[0]} >
            {product[1] === 'request' ? < NavbarBrand className={styles.text}>{product[0]}  </ NavbarBrand> :
              < NavbarBrand >{product.mark}  {product.model} </ NavbarBrand>}
            {product.amount && <AmountWidget id={product.id} amount={product.amount} />}
            {product.price && < NavbarBrand >  Total: {product.price * product.amount} $</ NavbarBrand>}
            <div onClick={() => remove(product.id)} className={styles.exit}>X</div>
            <SpecialRequest id={product.id} />
          </ListGroupItem>)}
      </ListGroup>
        : <Redirect to='/' />}
      { cartArray.length ? <NavLink className={styles.link} to={`/order`}><Button outline color="success">Order it!</Button></NavLink> : null}
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.object,
  removeItem: PropTypes.func,
  saveToCart: PropTypes.func,
};

const mapStateToProps = state => ({
  cart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  removeItem: (id) => dispatch(removeCartItem(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Cart,
  Component as CartComponent,
};

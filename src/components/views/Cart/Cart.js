import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getCart, saveCartRequest, removeCartItem } from '../../../redux/cartRedux';
import AmountWidget from '../../../components/features/AmountWidget/AmountWidget';
import {
  NavbarBrand, Collapse, Card, CardBody, Input,
} from 'reactstrap';
import styles from './Cart.module.scss';
// import { useHistory } from 'react-router-dom';
const Component = ({ className, cart, removeItem }) => {
  // const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState('');
  console.log(request);
  const toggle = () => setIsOpen(!isOpen);

  let cartArray = [];

  useEffect(() => {

    cartArray = [];
    // return () => {
    //   console.log('will unmount');
    // };
  }, [cart.products]);


  const remove = (id) => {
    removeItem(id);
  };

  const specialvalueuest = (value) => {
    console.log(value)
    if (!value) {
      setRequest(null);
    } else {
      setRequest(value);
    }
  };

  // const routeChange = () => {
  // let path = `/`;
  // history.push(path);

  // };

  cartArray = Array.from(cart.products);
  // if (!cartArray.length) {
  // setvalueuest(null)
  // routeChange();
  // }

  return (
    <>
      {cartArray.length ? <ListGroup className={clsx(className, styles.root)}>
        {cartArray.map(product =>
          <ListGroupItem className={styles.single} key={product.id} >{product.product}
            < NavbarBrand >{product.mark}  {product.model} </ NavbarBrand>
            {product.amount && <AmountWidget id={product.id} amount={product.amount} />}
            {product.price && < NavbarBrand >  Total Price: {product.price * product.amount}</ NavbarBrand>}
            <div onClick={() => remove(product.id)} className={styles.exit}>X</div>
          </ListGroupItem>)}
        <div className={styles.special}>
          <div className={styles.specialBtn} onClick={toggle}>Feel free to add special request</div>
          <Collapse isOpen={isOpen}>
            <Card>
              <Input type="textarea" name="valueuest" id="valueuest" onChange={e => specialvalueuest(e.target.value)} />
            </Card>
          </Collapse>
        </div>
      </ListGroup>
        : <Redirect to='/' />}
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

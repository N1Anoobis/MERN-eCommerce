import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getCart, saveCartRequest, removeCartItem } from '../../../redux/cartRedux';
import AmountWidget from '../../../components/features/AmountWidget/AmountWidget';
import {
  NavbarBrand, Collapse, Card, Input,
} from 'reactstrap';
import styles from './Cart.module.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { useHistory } from 'react-router-dom';
const Component = ({ className, cart, removeItem, saveToCart }) => {
  // const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState('');

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // console.log(request);
  const switched = () => setIsOpen(!isOpen);

  let flag = false;
  let cartArray = [];

  useEffect(() => {
    cartArray = [];
  }, [cart.products]);

  const remove = (id) => {
    removeItem(id);
  };

  const specialRequest = () => {
    if (request) {
      saveToCart([request, 'request']);
      setRequest('');
      toggle();
    }

  };

  cartArray = Array.from(cart.products);
  for (const iterator of cartArray) {
    if (iterator[1] === 'request') {
      flag = !flag;
    }
  }
  cartArray.sort();

  return (
    <>

      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Special request added to cart</ModalHeader>
          <ModalBody>
            You have just aded special request to cart. You can have 1 special request. You can allways remove it and add another one.
            Thank You for chosing our company
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={toggle}>Continue</Button>
          </ModalFooter>
        </Modal>
      </div>


      {cartArray.length ? <ListGroup className={clsx(className, styles.root)}>
        {cartArray.map(product =>
          <ListGroupItem className={styles.single} key={product.id?product.id:product[0]} >
            {product[1] === 'request' ? < NavbarBrand  >{product[0]}  </ NavbarBrand> :
              < NavbarBrand >{product.mark}  {product.model} </ NavbarBrand>}
            {product.amount && <AmountWidget id={product.id} amount={product.amount} />}
            {product.price && < NavbarBrand >  Total: {product.price * product.amount} $</ NavbarBrand>}

            <div onClick={() => remove(product.id)} className={styles.exit}>X</div>
          </ListGroupItem>)}
        {flag ? '' : <div className={styles.special}>
          <div className={styles.specialBtn} onClick={switched}>Feel free to add special request</div>
          <Collapse isOpen={isOpen}>
            <Card className={styles.cardRequest}>
              <Input className={styles.input} type="textarea" name="valueuest" id="valueuest" value={request} onChange={e => setRequest(e.target.value)} />
              <div className={styles.btn} onClick={specialRequest}> Add</div>
            </Card>
          </Collapse>
        </div>}
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
  saveToCart: (request) => dispatch(saveCartRequest(request)),
  removeItem: (id) => dispatch(removeCartItem(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};

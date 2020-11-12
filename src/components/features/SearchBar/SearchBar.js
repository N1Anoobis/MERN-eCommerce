import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { readCars, loadFiltredCars, loadCars } from '../../../redux/carRedux';
import styles from './SearchBar.module.scss';

const SearchBar = ({ className, cars, filterCars, getCars }) => {

  const [phrase, setPhrase] = useState('');

  if (!phrase) {
    getCars();
  }

  const checker = () => {
    if (phrase) {
      const filtredCarsArray = Array.from(cars);
      const filtred = filtredCarsArray.filter(car => { return (car.mark.toLowerCase()).includes(phrase); });
      filterCars(filtred);
    } else {
      getCars();
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Col className={styles.input} sm={6}>
        <FormGroup>
          <Label for="search"></Label>
          <div className={styles.enter} onClick={checker}>Search</div>
          <Input className={styles.input} value={phrase} type="text" name="search" id="search" placeholder="search" autoComplete="off" onChange={(e) => setPhrase(e.target.value)} />
        </FormGroup>
      </Col>
    </div>
  );
};

SearchBar.propTypes = {
  cars: PropTypes.any,
  className: PropTypes.string,
  getCars: PropTypes.func,
  filterCars: PropTypes.func,
};

const mapStateToProps = state => ({
  cars: readCars(state),
});

const mapDispatchToProps = dispatch => ({
  filterCars: data => dispatch(loadFiltredCars(data)),
  getCars: () => dispatch(loadCars()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
